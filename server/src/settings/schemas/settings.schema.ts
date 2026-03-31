import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class SiteSettings extends Document {
  @Prop({ default: 'main' })
  key: string;

  @Prop({ default: '' })
  messengerLink: string;
}

export const SiteSettingsSchema = SchemaFactory.createForClass(SiteSettings);
