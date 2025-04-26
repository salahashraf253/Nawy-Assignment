import { SaleType } from '../../enums/sale-type.enum';
import { City } from '../../enums/city.enum';
import { ImageDto } from 'src/image/image-dto';
import { ApiProperty } from '@nestjs/swagger';
export class FetchApartmentDto {
  @ApiProperty()
  id: number;
  @ApiProperty()
  title: string;
  @ApiProperty()
  description: string;
  @ApiProperty()
  developer: string;
  @ApiProperty()
  price: number;
  @ApiProperty()
  deliveryDate: Date;
  @ApiProperty()
  area: number;
  @ApiProperty()
  noOfBathrooms: number;
  @ApiProperty()
  noOfBedrooms: number;
  @ApiProperty()
  saleType: SaleType;
  @ApiProperty()
  city: City;
  @ApiProperty()
  images?: ImageDto[];
}