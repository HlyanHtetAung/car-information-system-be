import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateModelDto } from './dto/create-model.dto';
import { UpdateModelDto } from './dto/update-model.dto';

@Injectable()
export class ModelsService {
  constructor(private prisma: PrismaService) {}

  // get all models data
  async getAllModels() {
    try {
      return await this.prisma.model.findMany({
        include: {
          brand: true,
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

  // get models filter by brand id
  async getModlesByBrand(brandId: number) {
    try {
      return await this.prisma.model.findMany({
        where: {
          brandId,
        },
        include: {
          brand: true,
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

  // get models data with limit amount
  async getAllModelsWithPagination(page: number = 1, limit: number = 10) {
    try {
      const skip = (page - 1) * limit;
      const [models, total] = await this.prisma.$transaction([
        this.prisma.model.findMany({
          include: {
            brand: true,
          },
          skip,
          take: limit,
        }),
        this.prisma.model.count(),
      ]);

      return {
        data: models,
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

  async createModel(request: CreateModelDto) {
    const { name, brandId } = request;
    try {
      return await this.prisma.model.create({
        data: { name, brandId },
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

  async updateModel(id: number, request: UpdateModelDto) {
    try {
      return this.prisma.model.update({
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
}
