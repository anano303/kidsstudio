import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';
import { Roles } from '@/decorators/roles.decorator';
import { Role } from '@/types/role.enum';
import { RolesGuard } from '@/guards/roles.guard';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { AdminProfileDto } from '../dtos/admin.profile.dto';
import { UserDto } from '../dtos/user.dto';
import { UsersService } from '../services/users.service';
import { AuthService } from '../services/auth.service';
import { PaginatedUsersDto } from '../dtos/paginated-users.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/guards/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { CurrentUser } from '@/decorators/current-user.decorator';
import { User } from '../schemas/user.schema';

@Controller('users')
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  @Serialize(PaginatedUsersDto)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Get()
  async getUsers(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '20',
  ) {
    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);

    return this.usersService.findAll(pageNumber, limitNumber);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return this.usersService.deleteOne(id);
  }

  @Serialize(UserDto)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Get(':id')
  getUser(@Param('id') id: string) {
    return this.usersService.findById(id);
  }

  @Serialize(UserDto)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Put(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() credentials: AdminProfileDto,
  ) {
    console.log('Admin updating user', id, 'with data:', credentials);
    return this.usersService.adminUpdate(id, credentials);
  }

  @Serialize(UserDto)
  @Post('seed')
  @UseGuards(RolesGuard)
  @Roles(Role.Admin)
  async generateUsers() {
    return this.usersService.generateUsers(500);
  }

  @ApiTags('Users')
  @ApiOperation({ summary: 'Find user by email' })
  @Get('email/:email')
  async getUserByEmail(@Param('email') email: string) {
    return this.usersService.findOne(email);
  }

  @Serialize(UserDto)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Post()
  async createUser(@Body() createUserDto: AdminProfileDto) {
    return this.usersService.create(createUserDto);
  }

  @Post('profile-image')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  async uploadProfileImage(
    @CurrentUser() user: User,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }

    // Check file type
    const validMimeTypes = [
      'image/jpeg',
      'image/jpg',
      'image/png',
      'image/gif',
      'image/webp',
      'image/heic',
      'image/heif',
    ];

    if (
      !validMimeTypes.includes(file.mimetype.toLowerCase()) &&
      !file.mimetype.toLowerCase().startsWith('image/')
    ) {
      throw new BadRequestException(
        `Unsupported file type: ${file.mimetype}. Supported types: JPEG, PNG, GIF, WEBP.`,
      );
    }

    const timestamp = Date.now();
    const filePath = `profile-images/${timestamp}-${file.originalname.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
    const filesSizeInMb = Number((file.size / (1024 * 1024)).toFixed(1));

    if (filesSizeInMb > 5) {
      throw new BadRequestException('The file must be less than 5 MB.');
    }

    // Use string casting to access _id property
    return this.usersService.updateProfileImage(
      user['_id'] as string,
      filePath,
      file.buffer,
    );
  }

  @Post('seller-logo')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @UseInterceptors(FileInterceptor('file'))
  async uploadLogo(
    @CurrentUser() user: User,
    @UploadedFile() file: Express.Multer.File,
  ) {
    // Only admin can upload logos now
    if (user.role !== Role.Admin) {
      throw new BadRequestException('Only admins can upload logos');
    }

    if (!file) {
      throw new BadRequestException('No file uploaded');
    }

    // Check file type - same validation as profile images
    const validMimeTypes = [
      'image/jpeg',
      'image/jpg',
      'image/png',
      'image/gif',
      'image/webp',
      'image/heic',
      'image/heif',
    ];

    if (
      !validMimeTypes.includes(file.mimetype.toLowerCase()) &&
      !file.mimetype.toLowerCase().startsWith('image/')
    ) {
      throw new BadRequestException(
        `Unsupported file type: ${file.mimetype}. Supported types: JPEG, PNG, GIF, WEBP.`,
      );
    }

    const timestamp = Date.now();
    const filePath = `logos/${timestamp}-${file.originalname.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
    const filesSizeInMb = Number((file.size / (1024 * 1024)).toFixed(1));

    if (filesSizeInMb > 5) {
      throw new BadRequestException('The file must be less than 5 MB.');
    }

    // Upload image and return the URL
    const logoPath = await this.usersService.uploadImage(filePath, file.buffer);
    const logoUrl = await this.usersService.getProfileImageUrl(logoPath);

    return {
      message: 'Logo uploaded successfully',
      logoUrl: logoUrl,
    };
  }

  @Post('auth/logout')
  @UseGuards(JwtAuthGuard)
  async logout(@CurrentUser() user: User) {
    // Server-side logout logic if needed (e.g., invalidate refresh token)
    // For now, just return success - client will clear tokens
    return { message: 'Logged out successfully' };
  }

  @Post('auth/refresh')
  async refresh(@Body() body: { refreshToken: string }) {
    const { refreshToken } = body;
    if (!refreshToken) {
      throw new BadRequestException('Refresh token is required');
    }

    try {
      const newTokens = await this.authService.refresh(refreshToken);
      return { tokens: newTokens };
    } catch (error) {
      throw new BadRequestException('Invalid refresh token');
    }
  }

  @Post('auth/login')
  async login(@Body() body: { email: string; password: string }) {
    const { email, password } = body;
    if (!email || !password) {
      throw new BadRequestException('Email and password are required');
    }

    try {
      const result = await this.usersService.login(email, password);
      return {
        user: result.user,
        tokens: result.tokens,
      };
    } catch (error) {
      throw new BadRequestException('Invalid credentials');
    }
  }
}
