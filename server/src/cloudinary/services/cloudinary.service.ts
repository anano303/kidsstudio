import { Injectable } from '@nestjs/common';
import { UploadApiErrorResponse, UploadApiResponse, v2 } from 'cloudinary';
import { Readable } from 'stream';

@Injectable()
export class CloudinaryService {
  async uploadImage(
    file: Express.Multer.File,
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {
    return new Promise((resolve, reject) => {
      const upload = v2.uploader.upload_stream(
        { folder: 'ecommerce' },
        (error, result) => {
          if (error) {
            console.error('Cloudinary upload error:', error);
            return reject(error);
          }
          resolve(result as any);
        },
      );

      const stream = Readable.from(file.buffer);
      stream.pipe(upload);
    });
  }

  // Method for uploading from file path and buffer (for profile images)
  async uploadImageFromBuffer(
    filePath: string,
    buffer: Buffer,
  ): Promise<string> {
    return new Promise((resolve, reject) => {
      const upload = v2.uploader.upload_stream(
        {
          folder: 'profile-images',
          public_id: filePath
            .replace(/[^a-zA-Z0-9.-]/g, '_')
            .replace(/\.[^/.]+$/, ''), // Remove extension and clean filename
        },
        (error, result) => {
          if (error) {
            console.error('Cloudinary upload error:', error);
            return reject(error);
          }
          resolve(result?.public_id || '');
        },
      );

      const stream = Readable.from(buffer);
      stream.pipe(upload);
    });
  }

  // Method for uploading logos
  async uploadLogo(filePath: string, buffer: Buffer): Promise<string> {
    return new Promise((resolve, reject) => {
      const upload = v2.uploader.upload_stream(
        {
          folder: 'logos',
          public_id: filePath
            .replace(/[^a-zA-Z0-9.-]/g, '_')
            .replace(/\.[^/.]+$/, ''), // Remove extension and clean filename
        },
        (error, result) => {
          if (error) {
            console.error('Cloudinary upload error:', error);
            return reject(error);
          }
          resolve(result?.public_id || '');
        },
      );

      const stream = Readable.from(buffer);
      stream.pipe(upload);
    });
  }

  async uploadImages(images: string[]): Promise<string[]> {
    const uploadPromises = images.map(async (imageUrl) => {
      const response = await fetch(imageUrl);
      const buffer = Buffer.from(await response.arrayBuffer());

      return new Promise<string>((resolve, reject) => {
        const upload = v2.uploader.upload_stream(
          { folder: 'products' },
          (error, result) => {
            if (error) {
              console.error('Cloudinary upload error:', error);
              return reject(error);
            }
            resolve(result?.secure_url || '');
          },
        );

        const stream = Readable.from(buffer);
        stream.pipe(upload);
      });
    });

    return Promise.all(uploadPromises);
  }

  async uploadBuffer(buffer: Buffer): Promise<string> {
    return new Promise((resolve, reject) => {
      const upload = v2.uploader.upload_stream(
        { folder: 'products' },
        (error, result) => {
          if (error) {
            console.error('Cloudinary upload error:', error);
            return reject(error);
          }
          resolve(result?.secure_url || '');
        },
      );

      const stream = Readable.from(buffer);
      stream.pipe(upload);
    });
  }
  async deleteImageByFileId(publicId: string): Promise<void> {
    return new Promise((resolve, reject) => {
      v2.uploader.destroy(publicId, (error, result) => {
        if (error) {
          console.error('Cloudinary delete error:', error);
          return reject(error);
        }
        resolve();
      });
    });
  }

  // Method to get image URL by public ID
  async getImageByFileId(publicId: string): Promise<string> {
    if (!publicId) {
      throw new Error('Public ID is required');
    }

    // Generate the URL using Cloudinary's URL generation
    return v2.url(publicId, {
      secure: true,
      quality: 'auto',
      fetch_format: 'auto',
    });
  }
}
