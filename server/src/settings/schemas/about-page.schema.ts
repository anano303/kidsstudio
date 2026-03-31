import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AboutPageDocument = AboutPage & Document;

@Schema({ timestamps: true })
export class AboutPage {
  @Prop({ default: 'ჩვენ შესახებ - ანუ რატომ შეიქმნა პიპინიკები' })
  title: string;

  @Prop({ default: 'About Us - Why Pipiniks Were Created' })
  titleEn: string;

  @Prop({ default: 'GalaKids -' })
  brandIntroTitle: string;

  @Prop({ default: 'GalaKids -' })
  brandIntroTitleEn: string;

  @Prop({
    default:
      'ეს არის ბრენდი, რომელიც სიყვარულით, ხალისითა და ცოტაოდენი მაგიით შეიქმნა.',
  })
  brandIntroText: string;

  @Prop({
    default: 'A brand created with love, joy and a bit of magic.',
  })
  brandIntroTextEn: string;

  @Prop({
    type: [
      {
        text: String,
        textEn: { type: String, default: '' },
        type: { type: String, default: 'normal' },
      },
    ],
    default: [],
  })
  sections: {
    text: string;
    textEn: string;
    type: 'normal' | 'highlight' | 'quote' | 'final';
  }[];

  @Prop({ default: 'შემოგვიერთდი და ჩაიცვი პიპინიკები შენც!' })
  ctaText: string;

  @Prop({ default: 'Join us and wear Pipiniks too!' })
  ctaTextEn: string;

  @Prop({ default: 'მოდი, ერთად დავაპიპინოთ' })
  ctaHighlight: string;

  @Prop({ default: "Let's Pipinik together" })
  ctaHighlightEn: string;

  @Prop({ default: 'გაიცანი პიპინიკების შემქმნელები!' })
  creatorsTitle: string;

  @Prop({ default: 'Meet the creators of Pipiniks!' })
  creatorsTitleEn: string;

  @Prop({ default: '' })
  creatorImage1: string;

  @Prop({ default: '' })
  creatorImage2: string;
}

export const AboutPageSchema = SchemaFactory.createForClass(AboutPage);
