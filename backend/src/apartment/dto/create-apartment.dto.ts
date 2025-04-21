import { IsEnum, IsNotEmpty, IsNumber, IsString, IsDateString } from 'class-validator';
import { SaleType } from '../../enums/sale-type.enum';
import { City } from '../../enums/city.enum';

export class CreateApartmentDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsNumber()
  price: number;

  @IsDateString()
  deliveryDate: string;

  @IsNumber()
  area: number;

  @IsNumber()
  noOfBathrooms: number;

  @IsNumber()
  noOfBedrooms: number;

  @IsEnum(SaleType)
  saleType: SaleType;

  @IsEnum(City)
  city: City;
}
