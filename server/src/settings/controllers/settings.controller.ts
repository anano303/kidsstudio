import {
  Controller,
  Get,
  Patch,
  Put,
  Post,
  Body,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { SettingsService } from '../services/settings.service';
import { UpdateSettingsDto } from '../dtos/settings.dto';
import { UpdateFooterSettingsDto } from '../dtos/update-footer-settings.dto';
import { UpdatePrivacyPolicyDto } from '../dtos/update-privacy-policy.dto';
import { UpdateAboutPageDto } from '../dtos/update-about-page.dto';
import { UpdateTermsConditionsDto } from '../dtos/update-terms-conditions.dto';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { RolesGuard } from '../../guards/roles.guard';
import { Roles } from '../../decorators/roles.decorator';
import { Role } from '../../types/role.enum';
import { CloudinaryService } from '../../cloudinary/services/cloudinary.service';

@Controller('settings')
export class SettingsController {
  constructor(
    private readonly settingsService: SettingsService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  // ---- Messenger Link (existing) ----

  @Get()
  async getSettings() {
    return this.settingsService.getSettings();
  }

  @Patch()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  async updateSettings(@Body() dto: UpdateSettingsDto) {
    return this.settingsService.updateSettings(dto);
  }

  // ---- Footer Settings ----

  @Get('footer')
  async getFooterSettings() {
    return this.settingsService.getFooterSettings();
  }

  @Put('footer')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  async updateFooterSettings(@Body() dto: UpdateFooterSettingsDto) {
    return this.settingsService.updateFooterSettings(dto);
  }

  // ---- Privacy Policy ----

  @Get('privacy-policy')
  async getPrivacyPolicy() {
    return this.settingsService.getPrivacyPolicy();
  }

  @Put('privacy-policy')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  async updatePrivacyPolicy(@Body() dto: UpdatePrivacyPolicyDto) {
    return this.settingsService.updatePrivacyPolicy(dto);
  }

  // ---- About Page ----

  @Get('about')
  async getAboutPage() {
    return this.settingsService.getAboutPage();
  }

  @Put('about')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  async updateAboutPage(@Body() dto: UpdateAboutPageDto) {
    return this.settingsService.updateAboutPage(dto);
  }

  // ---- Terms & Conditions ----

  @Get('terms-conditions')
  async getTermsConditions() {
    return this.settingsService.getTermsConditions();
  }

  @Put('terms-conditions')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  async updateTermsConditions(@Body() dto: UpdateTermsConditionsDto) {
    return this.settingsService.updateTermsConditions(dto);
  }

  // ---- About Image Upload ----

  @Post('about/upload-image')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @UseInterceptors(FileInterceptor('file'))
  async uploadAboutImage(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }
    const result = await this.cloudinaryService.uploadImage(file);
    const optimizedUrl = result.secure_url.replace(
      '/upload/',
      '/upload/q_auto,f_auto,w_800/',
    );
    return { url: optimizedUrl };
  }
}
