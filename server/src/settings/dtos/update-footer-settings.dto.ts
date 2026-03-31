import { IsOptional, IsString } from 'class-validator';

export class UpdateFooterSettingsDto {
  @IsOptional()
  @IsString()
  message?: string;

  @IsOptional()
  @IsString()
  messageEn?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  addressEn?: string;

  @IsOptional()
  @IsString()
  email?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  facebookUrl?: string;

  @IsOptional()
  @IsString()
  instagramUrl?: string;

  @IsOptional()
  @IsString()
  contactEmail?: string;
}
