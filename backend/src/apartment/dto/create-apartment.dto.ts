import { 
  IsEnum, 
  IsNotEmpty, 
  IsNumber, 
  IsString, 
  IsDateString,
  Min,
  Max,
  IsPositive,
  Length,
  MinDate,
  MaxDate
} from 'class-validator';
import { Type } from 'class-transformer';
import { SaleType } from '../../enums/sale-type.enum';
import { City } from '../../enums/city.enum';
import { LegacyOracleNamingStrategy } from 'typeorm';

export class CreateApartmentDto {
  @IsString()
  @IsNotEmpty()
  @Length(3, 100)
  title: string;

  @IsString()
  @IsNotEmpty()
  @Length(10, 500)
  description: string;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  @Min(1e3)
  @Max(1e8)
  price: number;

  @IsDateString()
  @Type(() => Date)
  @MinDate(new Date(2025, 0, 1)) 
  @MaxDate(new Date(2030, 11, 31)) 
  deliveryDate: Date;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  @Min(20)
  @Max(1e4)
  area: number;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  @Min(1)
  @Max(10)
  noOfBathrooms: number;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  @Min(1)
  @Max(10)
  noOfBedrooms: number;

  @IsEnum(SaleType)
  @IsNotEmpty()
  saleType: SaleType;

  @IsEnum(City)
  @IsNotEmpty()
  city: City;
}
