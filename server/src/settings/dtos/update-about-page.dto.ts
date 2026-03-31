import {
  IsOptional,
  IsString,
  IsArray,
  ValidateNested,
  Allow,
} from 'class-validator';
import { Type } from 'class-transformer';

class AboutSectionDto {
  @Allow()
  _id?: string;

  @IsString()
  text: string;

  @IsOptional()
  @IsString()
  textEn?: string;

  @IsOptional()
  @IsString()
  type?: 'normal' | 'highlight' | 'quote' | 'final';
}

export class UpdateAboutPageDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  titleEn?: string;

  @IsOptional()
  @IsString()
  brandIntroTitle?: string;

  @IsOptional()
  @IsString()
  brandIntroTitleEn?: string;

  @IsOptional()
  @IsString()
  brandIntroText?: string;

  @IsOptional()
  @IsString()
  brandIntroTextEn?: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AboutSectionDto)
  sections?: AboutSectionDto[];

  @IsOptional()
  @IsString()
  ctaText?: string;

  @IsOptional()
  @IsString()
  ctaTextEn?: string;

  @IsOptional()
  @IsString()
  ctaHighlight?: string;

  @IsOptional()
  @IsString()
  ctaHighlightEn?: string;

  @IsOptional()
  @IsString()
  creatorsTitle?: string;

  @IsOptional()
  @IsString()
  creatorsTitleEn?: string;

  @IsOptional()
  @IsString()
  creatorImage1?: string;

  @IsOptional()
  @IsString()
  creatorImage2?: string;
}
