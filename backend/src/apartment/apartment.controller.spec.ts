import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { ApartmentController } from './apartment.controller';
import { ApartmentService } from './apartment.service';
import { CreateApartmentDto } from './dto/create-apartment.dto';
import { SaleType } from '../enums/sale-type.enum';
import { City } from '../enums/city.enum';

// Test data factory
function createTestApartment(overrides = {}) {
  const defaultApartment = {
    id: 1,
    title: 'Test Apartment',
    description: 'Test Description',
    price: 2000,
    deliveryDate: new Date('2025-02-01'),
    area: 150,
    noOfBathrooms: 2,
    noOfBedrooms: 3,
    saleType: SaleType.DEVELOPER_SALE,
    city: City.GIZA,
  };

  return { ...defaultApartment, ...overrides };
}

describe('ApartmentController', () => {
  let controller: ApartmentController;
  let service: ApartmentService;

  const mockApartmentService = {
    findAll: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ApartmentController],
      providers: [
        {
          provide: ApartmentService,
          useValue: mockApartmentService,
        },
      ],
    }).compile();

    controller = module.get<ApartmentController>(ApartmentController);
    service = module.get<ApartmentService>(ApartmentService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getAll', () => {
    it('should call service.findAll with pagination', async () => {
      const mockResult = [createTestApartment()];
      mockApartmentService.findAll.mockResolvedValue(mockResult);

      const result = await controller.getAll('2', '5');
      
      expect(service.findAll).toHaveBeenCalledWith({ page: 2, limit: 5 });
      expect(result).toEqual(mockResult);
      expect(result[0]).toHaveProperty('id');
      expect(result[0]).toHaveProperty('title', 'Test Apartment');
    });

    it('should use default pagination if query is not provided', async () => {
      const mockResult = [createTestApartment({ id: 2 })];
      mockApartmentService.findAll.mockResolvedValue(mockResult);

      const result = await controller.getAll(undefined, undefined);
      
      expect(service.findAll).toHaveBeenCalledWith({ page: 1, limit: 10 });
      expect(result).toEqual(mockResult);
    });

    it('should handle invalid pagination parameters', async () => {
      const mockResult = [createTestApartment()];
      mockApartmentService.findAll.mockResolvedValue(mockResult);

      // Test with non-numeric strings
      await expect(controller.getAll('abc', 'def')).resolves.not.toThrow();
      expect(service.findAll).toHaveBeenCalledWith({ page: 1, limit: 10 });

      // Test with negative numbers
      await controller.getAll('-1', '-5');
      expect(service.findAll).toHaveBeenCalledWith({ page: 1, limit: 10 });
    });

    it('should return empty array when no apartments found', async () => {
      mockApartmentService.findAll.mockResolvedValue([]);
      
      const result = await controller.getAll();
      expect(result).toEqual([]);
    });
  });

  describe('getOne', () => {
    it('should return an apartment by id', async () => {
      const apartment = createTestApartment();
      mockApartmentService.findOne.mockResolvedValue(apartment);

      const result = await controller.getOne(1);
      
      expect(service.findOne).toHaveBeenCalledWith(1);
      expect(result).toEqual(apartment);
      expect(result).toHaveProperty('id', 1);
      expect(result).toHaveProperty('title', 'Test Apartment');
    });

    it('should throw NotFoundException when apartment does not exist', async () => {
      mockApartmentService.findOne.mockResolvedValue(null);
      
      await expect(controller.getOne(999)).rejects.toThrow(NotFoundException);
    });

    it('should reject invalid apartment id', async () => {
      await expect(controller.getOne(null)).rejects.toThrow();
      await expect(controller.getOne(undefined)).rejects.toThrow();
    });
  });

  describe('create', () => {
    const validDto: CreateApartmentDto = {
      title: 'Luxury Apartment',
      description: 'Top floor with city view',
      price: 5000,
      deliveryDate: '2025-12-01',
      area: 200,
      noOfBathrooms: 2,
      noOfBedrooms: 4,
      saleType: SaleType.RESALE,
      city: City.CAIRO,
    };

    it('should create a new apartment', async () => {
      const created = {
        id: 2,
        ...validDto,
        deliveryDate: new Date(validDto.deliveryDate),
      };

      mockApartmentService.create.mockResolvedValue(created);

      const result = await controller.create(validDto);
      
      expect(service.create).toHaveBeenCalledWith(validDto);
      expect(result).toEqual(created);
      expect(result).toHaveProperty('id', 2);
      expect(result.deliveryDate).toBeInstanceOf(Date);
    });

    it('should properly convert deliveryDate string to Date', async () => {
      const dtoWithDate = {
        ...validDto,
        deliveryDate: '2025-06-15T00:00:00.000Z'
      };
      const result = await controller.create(dtoWithDate);
      
      expect(result.deliveryDate).toBeInstanceOf(Date);
      expect(result.deliveryDate.toISOString()).toBe('2025-06-15T00:00:00.000Z');
    });

    it('should reject invalid CreateApartmentDto', async () => {
      const invalidDtos = [
        { ...validDto, title: undefined }, // Missing required field
        { ...validDto, price: 'not-a-number' } as any, // Wrong type
        { ...validDto, saleType: 'INVALID_TYPE' } as any, // Invalid enum
        { ...validDto, area: -100 } // Invalid value
      ];

      for (const dto of invalidDtos) {
        await expect(controller.create(dto)).rejects.toThrow();
      }
    });

    it('should validate enum values', async () => {
      const invalidDto = {
        ...validDto,
        saleType: 'INVALID_SALE_TYPE',
        city: 'INVALID_CITY'
      } as any;

      await expect(controller.create(invalidDto)).rejects.toThrow();
    });
  });

  describe('delete', () => {
    it('should delete an apartment by id', async () => {
      const deleted = { message: 'Deleted successfully' };
      mockApartmentService.remove.mockResolvedValue(deleted);

      const result = await controller.delete(1);
      
      expect(service.remove).toHaveBeenCalledWith(1);
      expect(result).toEqual(deleted);
    });

    it('should throw when trying to delete non-existent apartment', async () => {
      mockApartmentService.remove.mockRejectedValue(new NotFoundException());
      
      await expect(controller.delete(999)).rejects.toThrow(NotFoundException);
    });

    it('should reject invalid apartment id', async () => {
      await expect(controller.delete(null)).rejects.toThrow();
      await expect(controller.delete(undefined)).rejects.toThrow();
    });
  });
});