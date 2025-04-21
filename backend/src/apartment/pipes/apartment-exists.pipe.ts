import {
    PipeTransform,
    Injectable,
    NotFoundException,
  } from '@nestjs/common';
  import { ApartmentService } from '../apartment.service';
  
  @Injectable()
  export class ApartmentExistsPipe implements PipeTransform {
    constructor(private readonly apartmentService: ApartmentService) {}
  
    async transform(value: any) {
      const id = parseInt(value, 10);
      const apartment = await this.apartmentService.findOne(id);
      if (!apartment) {
        console.error(`Apartment with ID ${id} not found`);
        console.log('Apartment not found in the database');
        throw new NotFoundException(`Apartment with ID ${id} not found`);
      }
      return id;
    }
  }
  