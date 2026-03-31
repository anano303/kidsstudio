import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';
import { UsersModule } from 'src/users/users.module';
import { CommandModule } from 'nestjs-command';
import { CartModule } from 'src/cart/cart.module';
import { OrderModule } from '../orders/order.module';
import { PaymentsModule } from '../payments/payments.module';
// import { SeedsModule } from '../seeds/seeds.module';
import { AppController } from './controllers/app.controller';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';
import { AppService } from './services/app.service';
import { BannerModule } from '../banners/banner.module';
import { SettingsModule } from '../settings/settings.module';
import { SharedServicesModule } from './shared-services.module';

import { GoogleStrategy } from '@/strategies/google.strategy';
import { JwtStrategy } from '@/strategies/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { connectDB } from '@/utils/config';
import {
  IndexCleanupService,
  ProductsModule,
} from '@/products/products.module';
import { CategoriesModule } from '@/categories/categories.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
    ScheduleModule.forRoot(),
    PassportModule,
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: connectDB,
    }),
    CommandModule,
    ProductsModule,
    UsersModule,
    CartModule,
    OrderModule,
    CloudinaryModule,
    CategoriesModule,
    PaymentsModule,
    SharedServicesModule,
    BannerModule,
    SettingsModule,

    // SeedsModule,
  ],
  controllers: [AppController],
  providers: [AppService, GoogleStrategy, JwtStrategy, IndexCleanupService],
  exports: [AppService],
})
export class AppModule {}
