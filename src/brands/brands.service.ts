import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBrandDto, UpdateBrandDto } from './dto/brand.dto';

@Injectable()
export class BrandsService {
  constructor(private prisma: PrismaService) {}

  async getAllBrands() {
    try {
      return await this.prisma.brand.findMany();
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

  // get brands data with limit amount
  async getAllBrandsWithPagination(page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;

    const [brands, total] = await this.prisma.$transaction([
      this.prisma.brand.findMany({
        skip,
        take: limit,
      }),
      this.prisma.brand.count(),
    ]);

    return {
      data: brands,
      total,
      page,
      limit,
    };
  }

  async createBrand(request: CreateBrandDto) {
    try {
      return await this.prisma.brand.create({
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

  async updateBrand(id: number, request: UpdateBrandDto) {
    return this.prisma.brand.update({
      where: { id },
      data: request,
    });
  }
}
