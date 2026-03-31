import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SiteSettings, SiteSettingsSchema } from './schemas/settings.schema';
import {
  FooterSettings,
  FooterSettingsSchema,
} from './schemas/footer-settings.schema';
import {
  PrivacyPolicy,
  PrivacyPolicySchema,
} from './schemas/privacy-policy.schema';
import { AboutPage, AboutPageSchema } from './schemas/about-page.schema';
import {
  TermsConditions,
  TermsConditionsSchema,
} from './schemas/terms-conditions.schema';
import { SettingsService } from './services/settings.service';
import { SettingsController } from './controllers/settings.controller';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SiteSettings.name, schema: SiteSettingsSchema },
      { name: FooterSettings.name, schema: FooterSettingsSchema },
      { name: PrivacyPolicy.name, schema: PrivacyPolicySchema },
      { name: AboutPage.name, schema: AboutPageSchema },
      { name: TermsConditions.name, schema: TermsConditionsSchema },
    ]),
    CloudinaryModule,
  ],
  controllers: [SettingsController],
  providers: [SettingsService],
  exports: [SettingsService],
})
export class SettingsModule {}
