import { SaleType } from '../../enums/sale-type.enum';
import { City } from '../../enums/city.enum';
import { ImageDto } from 'src/image/image-dto';
export class FetchApartmentDto {
  id: number;
  title: string;
  description: string;
  price: number;
  deliveryDate: Date;
  area: number;
  noOfBathrooms: number;
  noOfBedrooms: number;
  saleType: SaleType;
  city: City;
  images?: ImageDto[];
}