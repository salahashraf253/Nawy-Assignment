import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Apartment } from './apartment.entity';
import { ApartmentService } from './apartment.service';
import { ApartmentController } from './apartment.controller';
import { ApartmentExistsPipe } from './pipes/apartment-exists.pipe';
import { Image } from '../image/image.entity';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import {extname} from 'path';
@Module({
  imports: [TypeOrmModule.forFeature([Apartment,Image]),
  MulterModule.register({
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, file.fieldname + '-' + uniqueSuffix + extname(file.originalname));
      },
    }),
    limits: {
      fileSize: 5 * 1024 * 1024, 
    },
    fileFilter: (req, file, cb) => {
      const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
      if (!allowedTypes.includes(file.mimetype)) {
        return cb(new Error('Invalid file type. Only JPEG and PNG are allowed.'), false);
      }
      cb(null, true);
    },
  })
  ],
  controllers: [ApartmentController],
  providers: [ApartmentService,ApartmentExistsPipe],
})
export class ApartmentModule {}
