import { Controller, Get, Post, Delete, Param, Body, Query, UseInterceptors,  UploadedFiles,ValidationPipe } from '@nestjs/common';
import { ApartmentService } from './apartment.service';
import { CreateApartmentDto } from './dto/create-apartment.dto';
import { ApartmentExistsPipe } from './pipes/apartment-exists.pipe';
import { FilesInterceptor } from '@nestjs/platform-express';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { FetchApartmentDto } from './dto/fetch-apartment.dto';
@ApiTags('Apartments')
@Controller('apartments')
export class ApartmentController {
  constructor(private readonly apartmentService: ApartmentService) {}

  @Get()
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiOkResponse({ description: 'List of apartments' })

  async getAll(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    const pageNum = parseInt(page, 10) || 1;
    const limitNum = parseInt(limit, 10) || 10;

    return await this.apartmentService.findAll({ page: pageNum, limit: limitNum });
  }

  @Get(':id')
  @ApiParam({ name: 'id', type: Number })
  @ApiOkResponse({type: FetchApartmentDto})
  async getOne(@Param('id', ApartmentExistsPipe) id: number) {
    return await this.apartmentService.findOne(id);
  }

  @Post()
  @ApiBody({ type: CreateApartmentDto })
  @ApiCreatedResponse({ type: FetchApartmentDto })
  @UseInterceptors(FilesInterceptor('images', 10))
  async create(
    @Body() createApartmentDto,
    @UploadedFiles() images: Express.Multer.File[],
  ) {
    return this.apartmentService.create(createApartmentDto, images);
  }

  @Delete(':id')
  @ApiParam({ name: 'id', type: Number })
  @ApiOkResponse({ description: 'Apartment deleted successfully' })
  async delete(@Param('id', ApartmentExistsPipe) id: number) {
    return await this.apartmentService.remove(id);
  }
}
