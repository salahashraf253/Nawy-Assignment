import { Controller, Get, Post, Delete, Param, Body, Query, ParseIntPipe, ValidationPipe } from '@nestjs/common';
import { ApartmentService } from './apartment.service';
import { CreateApartmentDto } from './dto/create-apartment.dto';
import { ApartmentExistsPipe } from './pipes/apartment-exists.pipe';

@Controller('apartments')
export class ApartmentController {
  constructor(private readonly apartmentService: ApartmentService) {}

  @Get()
  async getAll(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    const pageNum = parseInt(page, 10) || 1;
    const limitNum = parseInt(limit, 10) || 10;

    return await this.apartmentService.findAll({ page: pageNum, limit: limitNum });
  }

  @Get(':id')
  async getOne(@Param('id', ApartmentExistsPipe) id: number) {
    return await this.apartmentService.findOne(id);
  }

  @Post()
  async create(
    @Body(new ValidationPipe({ transform: true })) 
    createApartmentDto: CreateApartmentDto
  ) {
    return await this.apartmentService.create(createApartmentDto);
  }

  @Delete(':id')
  async delete(@Param('id', ApartmentExistsPipe) id: number) {
    return await this.apartmentService.remove(id);
  }
}
