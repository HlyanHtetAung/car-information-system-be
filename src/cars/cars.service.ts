import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';

@Injectable()
export class CarsService {
  constructor(private prisma: PrismaService) {}

  async getAllCars() {
    try {
      return await this.prisma.car.findMany({
        include: {
          brand: true,
          model: true,
        },
      });
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Something went wrong while creating the brand',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // get cars data with limit amount
  async getAllCarsWithPagination(
    page: number = 1,
    limit: number = 10,
    search: string = '',
  ) {
    try {
      let where = search
        ? {
            registrationNumber: {
              contains: search,
            },
          }
        : {};

      // console.log('** where **', where);
      const skip = (page - 1) * limit;

      const [cars, total] = await this.prisma.$transaction([
        this.prisma.car.findMany({
          where,
          skip,
          take: limit,
          include: {
            brand: true,
            model: true,
          },
        }),
        this.prisma.car.count({
          where,
        }),
      ]);

      return {
        data: cars,
        total,
        page,
        limit,
      };
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Something went wrong while creating the brand',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // checking the registarion number is already exist to prevent duplicate
  async checkRegistrationNumberAlreadyExist(registrationNumber: any) {
    try {
      const existingCar = await this.prisma.car.findUnique({
        where: {
          registrationNumber: registrationNumber.registrationNumber,
        },
      });

      return existingCar !== null;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Something went wrong while creating the brand',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async createCar(request: CreateCarDto) {
    try {
      return await this.prisma.car.create({
        data: request,
      });
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Something went wrong while creating the brand',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updateCar(id: number, request: UpdateCarDto) {
    try {
      return this.prisma.car.update({
        where: { id },
        data: request,
      });
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Something went wrong while creating the brand',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async deleteCar(id: number) {
    try {
      return this.prisma.car.delete({
        where: { id },
      });
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Something went wrong while creating the brand',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async validateBrandsAndModelsExist() {
    try {
      const brandCount = await this.prisma.brand.count();
      const modelCount = await this.prisma.model.count();

      return { brandCount, modelCount };
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Something went wrong while creating the brand',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
