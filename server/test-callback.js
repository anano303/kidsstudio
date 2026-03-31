// Test script to verify the callback endpoint is working
const axios = require('axios');

async function testCallback() {
  try {
    const testData = {
      external_order_id: 'test-external-id-123',
      status: 'succeeded',
      order_id: 'test-order-id-456',
    };

    console.log('Testing callback endpoint...');
    const response = await axios.post(
      'http://localhost:4000/v1/payments/bog/callback',
      testData,
    );

    console.log('Response:', response.data);
  } catch (error) {
    console.error('Error:', error.message);
    if (error.response) {
      console.error('Response data:', error.response.data);
    }
  }
}

testCallback();
