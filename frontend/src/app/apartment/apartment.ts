import { SaleType } from '../../enums/sale-type.enum';
import { City } from '../../enums/city.enum';
import { Image } from './image-entity';

  export interface Apartment {
    id: number;
    title: string;
    description: string;
    price: number;
    deliveryDate: string; 
    developer: string;
    area: number;
    noOfBathrooms: number;
    noOfBedrooms: number;
    saleType: SaleType;
    city: City;
    images?: Image[];
  }
  