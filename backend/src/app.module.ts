import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApartmentModule } from './apartment/apartment.module';
import { Apartment } from './apartment/apartment.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL, 
      entities: [Apartment],
      synchronize: true, 
      autoLoadEntities: true, 
    }),
    ApartmentModule,
  ],
})
export class AppModule {}
