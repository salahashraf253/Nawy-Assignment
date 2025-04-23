import { Test, TestingModule } from "@nestjs/testing";
import { NotFoundException, BadRequestException } from "@nestjs/common";
import { ApartmentController } from "./apartment.controller";
import { ApartmentService } from "./apartment.service";
import { CreateApartmentDto } from "./dto/create-apartment.dto";
import { SaleType } from "../enums/sale-type.enum";
import { City } from "../enums/city.enum";
import { Image } from "src/image/image.entity";
import { Apartment } from "./apartment.entity";

function createTestApartment(overrides = {}) {
  const defaultApartment = {
    id: 1,
    title: "Test Apartment",
    description: "Test Description",
    price: 2000,
    deliveryDate: new Date("2025-02-01"),
    area: 150,
    noOfBathrooms: 2,
    noOfBedrooms: 3,
    saleType: SaleType.DEVELOPER_SALE,
    city: City.GIZA,
  };

  return { ...defaultApartment, ...overrides };
}

describe("ApartmentController", () => {
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

  describe("getAll", () => {
    it("should call service.findAll with pagination", async () => {
      const mockResult = [createTestApartment()];
      mockApartmentService.findAll.mockResolvedValue(mockResult);

      const result = await controller.getAll("2", "5");

      expect(service.findAll).toHaveBeenCalledWith({ page: 2, limit: 5 });
      expect(result).toEqual(mockResult);
      expect(result[0]).toHaveProperty("id");
      expect(result[0]).toHaveProperty("title", "Test Apartment");
    });

    it("should use default pagination if query is not provided", async () => {
      const mockResult = [createTestApartment({ id: 2 })];
      mockApartmentService.findAll.mockResolvedValue(mockResult);

      const result = await controller.getAll(undefined, undefined);

      expect(service.findAll).toHaveBeenCalledWith({ page: 1, limit: 10 });
      expect(result).toEqual(mockResult);
    });

    it("should handle invalid pagination parameters", async () => {
      const mockResult = [createTestApartment()];
      mockApartmentService.findAll.mockResolvedValue(mockResult);

      await expect(controller.getAll("abc", "def")).resolves.not.toThrow();
      expect(service.findAll).toHaveBeenCalledWith({ page: 1, limit: 10 });

      await controller.getAll("-1", "-5");
      expect(service.findAll).toHaveBeenCalledWith({ page: 1, limit: 10 });
    });

    it("should return empty array when no apartments found", async () => {
      mockApartmentService.findAll.mockResolvedValue([]);

      const result = await controller.getAll();
      expect(result).toEqual([]);
    });
  });

  describe("getOne", () => {
    it("should return an apartment by id", async () => {
      const apartment = createTestApartment();
      mockApartmentService.findOne.mockResolvedValue(apartment);

      const result = await controller.getOne(1);

      expect(service.findOne).toHaveBeenCalledWith(1);
      expect(result).toEqual(apartment);
      expect(result).toHaveProperty("id", 1);
      expect(result).toHaveProperty("title", "Test Apartment");
    });
    it("should throw NotFoundException when apartment does not exist", async () => {
      mockApartmentService.findOne.mockResolvedValue(null);

      try {
        await controller.getOne(999);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toBe("Apartment with ID 999 not found");
      }
    });

    it("should reject invalid apartment id", async () => {
      mockApartmentService.findOne.mockResolvedValue(null);
      try {
        await controller.getOne(null);
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
      }

      try {
        await controller.getOne(undefined);
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
      }
    });
  });

  describe("create", () => {
    const validDto: CreateApartmentDto = {
      title: "Luxury Apartment",
      description: "Top floor with city view",
      price: 5000,
      deliveryDate: new Date("2025-12-01"),
      area: 200,
      noOfBathrooms: 2,
      noOfBedrooms: 4,
      saleType: SaleType.RESALE,
      city: City.CAIRO,
    };

    const mockFiles = [
      {
        fieldname: 'images',
        originalname: 'test1.png',
        encoding: '7bit',
        mimetype: 'image/png',
        buffer: Buffer.from('test1'),
        size: 1024,
      },
      {
        fieldname: 'images',
        originalname: 'test2.png',
        encoding: '7bit',
        mimetype: 'image/png',
        buffer: Buffer.from('test2'),
        size: 2048,
      },
    ] as Express.Multer.File[];

    const mockApartment = new Apartment();
    mockApartment.id = 1;

    const mockImages: Image[] = [
      {
        url: "/uploads/images-1745392956584-760042648.png",
        id: 9,
        apartment: mockApartment,
      },
      {
        url: "/uploads/images-1745392956585-281526689.png",
        id: 10,
        apartment: mockApartment,
      },
    ];

    it("should create a new apartment", async () => {
      const created = {
        id: 2,
        ...validDto,
        deliveryDate: new Date(validDto.deliveryDate),
        images: mockImages,
      };

      mockApartmentService.create.mockResolvedValue(created);

      const result = await controller.create(validDto, mockFiles);

      expect(service.create).toHaveBeenCalledWith(validDto, mockFiles);
      expect(result).toEqual(created);
      expect(result).toHaveProperty("id", 2);
      expect(result.deliveryDate).toBeInstanceOf(Date);
    });

    it("should reject invalid CreateApartmentDto", async () => {
      const invalidDtos = [
        { ...validDto, title: undefined },
        { ...validDto, price: "not-a-number" } as any,
        { ...validDto, saleType: "INVALID_TYPE" } as any,
        { ...validDto, area: -100 }, // Invalid value
      ];

      for (const dto of invalidDtos) {
        try {
          await controller.create(dto, mockFiles);
        } catch (error) {
          expect(error).toBeInstanceOf(BadRequestException);
        }
      }
    });

    it("should validate enum values", async () => {
      const invalidDto = {
        ...validDto,
        saleType: "INVALID_SALE_TYPE",
        city: "INVALID_CITY",
      } as any;

      try {
        await controller.create(invalidDto, mockFiles);
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
      }
    });
  });

  describe("delete", () => {
    it("should delete an apartment by id", async () => {
      const deleted = { message: "Deleted successfully" };
      mockApartmentService.remove.mockResolvedValue(deleted);

      const result = await controller.delete(1);

      expect(service.remove).toHaveBeenCalledWith(1);
      expect(result).toEqual(deleted);
    });

    it("should throw when trying to delete non-existent apartment", async () => {
      mockApartmentService.remove.mockRejectedValue(new NotFoundException());

      await expect(controller.delete(999)).rejects.toThrow(NotFoundException);
    });

    it("should reject invalid apartment id", async () => {
      await expect(controller.delete(null)).rejects.toThrow();
      await expect(controller.delete(undefined)).rejects.toThrow();
    });
  });
});