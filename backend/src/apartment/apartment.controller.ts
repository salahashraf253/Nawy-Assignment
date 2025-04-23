import { Controller, Get, Post, Delete, Param, Body, Query, UseInterceptors,  UploadedFiles,ValidationPipe } from '@nestjs/common';
import { ApartmentService } from './apartment.service';
import { CreateApartmentDto } from './dto/create-apartment.dto';
import { ApartmentExistsPipe } from './pipes/apartment-exists.pipe';
import { FilesInterceptor } from '@nestjs/platform-express';

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
  @UseInterceptors(FilesInterceptor('images', 10))
  async create(
    @Body() createApartmentDto,
    @UploadedFiles() images: Express.Multer.File[],
  ) {
    return this.apartmentService.create(createApartmentDto, images);
  }

  @Delete(':id')
  async delete(@Param('id', ApartmentExistsPipe) id: number) {
    return await this.apartmentService.remove(id);
  }
}
