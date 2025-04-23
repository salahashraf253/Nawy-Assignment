import { Injectable,NotFoundException  } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Apartment } from './apartment.entity';
import { CreateApartmentDto } from './dto/create-apartment.dto';
import { FetchApartmentDto } from './dto/fetch-apartment.dto';
import { Image } from '../image/image.entity';

@Injectable()
export class ApartmentService {
  constructor(
    @InjectRepository(Apartment)
    private readonly apartmentRepo: Repository<Apartment>,
    @InjectRepository(Image)
    private readonly imageRepo: Repository<Image>,
  ) {}

  async findAll({ page, limit }: { page: number; limit: number }) {
    const [items, total] = await this.apartmentRepo.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      relations: ['images'],
    });

    return {
      currentPage: page,
      perPage: limit,
      totalItems: total,
      totalPages: Math.ceil(total / limit),
      items,
    };
  }

  async findOne(id: number): Promise<FetchApartmentDto> {
    const apartment = await this.apartmentRepo.findOne({
      where: { id },
      relations: ['images'], 
    });
    if (!apartment) {
      throw new NotFoundException(`Apartment with ID ${id} not found`);
    }
    return apartment;
  }

  async create(dto: CreateApartmentDto,images: Express.Multer.File[]): Promise<Apartment> {
    const apartment = this.apartmentRepo.create(dto);
    apartment.images=[];
    for (const image of images) {
      const newImage = this.imageRepo.create({
        url: `/uploads/${image.filename}`,
      });
      apartment.images.push(newImage);
    }
    return await this.apartmentRepo.save(apartment);
  }
  async remove(id: number) {
    const apartment = await this.apartmentRepo.findOneBy({ id });
    if (!apartment) {
      throw new NotFoundException(`Apartment with ID ${id} not found`);
    }
    await this.apartmentRepo.remove(apartment);
    return { message: `Apartment with ID ${id} has been deleted` };
  }
}
