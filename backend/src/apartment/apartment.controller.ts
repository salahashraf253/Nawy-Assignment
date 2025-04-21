import { Controller, Get, Post, Delete, Param, Body, Query, ParseIntPipe } from '@nestjs/common';
import { ApartmentService } from './apartment.service';
import { CreateApartmentDto } from './dto/create-apartment.dto';

@Controller('apartments')
export class ApartmentController {
  constructor(private readonly service: ApartmentService) {}

  @Get()
  getAll(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    const pageNum = parseInt(page, 10) || 1;
    const limitNum = parseInt(limit, 10) || 10;

    return this.service.findAll({ page: pageNum, limit: limitNum });
  }

  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateApartmentDto) {
    return this.service.create(dto);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}
