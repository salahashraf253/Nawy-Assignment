import { Entity,PrimaryGeneratedColumn,Column, ManyToOne } from "typeorm";
import { Apartment } from "../apartment/apartment.entity";

@Entity()
export class Image{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 500 })
    url: string;

    @ManyToOne(() => Apartment, (apartment) => apartment.images,{ onDelete: 'CASCADE' })
    apartment: Apartment;
}