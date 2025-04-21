import { Injectable,NotFoundException  } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Apartment } from './apartment.entity';
import { CreateApartmentDto } from './dto/create-apartment.dto';
import { FetchApartmentDto } from './dto/fetch-apartment.dto';

@Injectable()
export class ApartmentService {
  constructor(
    @InjectRepository(Apartment)
    private apartmentRepo: Repository<Apartment>,
  ) {}

  async findAll({ page, limit }: { page: number; limit: number }) {
    const [items, total] = await this.apartmentRepo.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
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
    return await this.apartmentRepo.findOneBy({ id });
  }

  async create(dto: CreateApartmentDto): Promise<Apartment> {
    const apartment = this.apartmentRepo.create(dto);
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
