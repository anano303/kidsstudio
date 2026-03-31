import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type FooterSettingsDocument = FooterSettings & Document;

@Schema({ timestamps: true })
export class FooterSettings {
  @Prop({ default: 'სანამ წახვალ, გაიგე მეტი ჩვენს შესახებ!' })
  message: string;

  @Prop({ default: 'Before you leave, learn more about us!' })
  messageEn: string;

  @Prop({ default: 'თბილისი, საქართველო' })
  address: string;

  @Prop({ default: 'Tbilisi, Georgia' })
  addressEn: string;

  @Prop({ default: 'info@galakids.ge' })
  email: string;

  @Prop({ default: '+995 599 546 494' })
  phone: string;

  @Prop({ default: 'https://www.facebook.com/profile.php?id=61574139157964' })
  facebookUrl: string;

  @Prop({
    default:
      'https://www.instagram.com/galakids?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==',
  })
  instagramUrl: string;

  @Prop({ default: 'info@galakids.ge' })
  contactEmail: string;
}

export const FooterSettingsSchema =
  SchemaFactory.createForClass(FooterSettings);
