import { Entity, PrimaryGeneratedColumn, Column , OneToMany} from 'typeorm';
import { SaleType } from '../enums/sale-type.enum';
import { City } from '../enums/city.enum';
import { Image } from '../image/image.entity';
@Entity()
export class Apartment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  title: string;

  @Column({ length: 500 })
  description: string;

  @Column({ length: 100 })
  developer: string;

  @Column({ type: 'float' })
  price: number;

  @Column({ type: 'date' })
  deliveryDate: Date;

  @Column()
  area: number;

  @Column()
  noOfBathrooms: number;

  @Column()
  noOfBedrooms: number;

  @Column({ type: 'enum', enum: SaleType })
  saleType: SaleType;

  @Column({ type: 'enum', enum: City })
  city: City;

  @OneToMany(() => Image, (image) => image.apartment, { cascade: true })
  images?: Image[];
}
