import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Apartment } from './apartment.entity';
import { ApartmentService } from './apartment.service';
import { ApartmentController } from './apartment.controller';
import { ApartmentExistsPipe } from './pipes/apartment-exists.pipe';

@Module({
  imports: [TypeOrmModule.forFeature([Apartment])],
  controllers: [ApartmentController],
  providers: [ApartmentService,ApartmentExistsPipe],
})
export class ApartmentModule {}
