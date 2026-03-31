// Script to completely remove TTL index from orders collection
const { MongoClient } = require('mongodb');

async function removeTTLIndexCompletely() {
  const client = new MongoClient(
    process.env.MONGODB_URL || 'mongodb://localhost:27017/galakids',
  );

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db();
    const collection = db.collection('orders');

    // List all indexes
    const indexes = await collection.listIndexes().toArray();
    console.log('Current indexes:');
    indexes.forEach((index) => {
      console.log(`- ${index.name}: ${JSON.stringify(index.key)}`);
      if (index.expireAfterSeconds !== undefined) {
        console.log(`  TTL: ${index.expireAfterSeconds} seconds`);
      }
    });

    // Remove any TTL indexes
    const ttlIndexes = indexes.filter(
      (index) =>
        index.expireAfterSeconds !== undefined ||
        index.name.includes('stockReservationExpires') ||
        JSON.stringify(index.key).includes('stockReservationExpires'),
    );

    for (const ttlIndex of ttlIndexes) {
      try {
        await collection.dropIndex(ttlIndex.name);
        console.log(`Removed TTL index: ${ttlIndex.name}`);
      } catch (error) {
        console.log(`Could not remove index ${ttlIndex.name}:`, error.message);
      }
    }

    // Verify no TTL indexes remain
    const finalIndexes = await collection.listIndexes().toArray();
    const remainingTTL = finalIndexes.filter(
      (index) => index.expireAfterSeconds !== undefined,
    );

    if (remainingTTL.length === 0) {
      console.log('✅ All TTL indexes removed successfully');
    } else {
      console.log('⚠️ Some TTL indexes still remain:', remainingTTL);
    }
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await client.close();
  }
}

removeTTLIndexCompletely();
