import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';

@Injectable()
export class CarsService {
  constructor(private prisma: PrismaService) {}

  async getAllCars() {
    return await this.prisma.car.findMany({
      include: {
        brand: true,
        model: true,
      },
    });
  }

  async createCar(request: CreateCarDto) {
    return await this.prisma.car.create({
      data: request,
    });
  }

  async updateCar(id: number, request: UpdateCarDto) {
    return this.prisma.car.update({
      where: { id },
      data: request,
    });
  }

  async deleteCar(id: number) {
    return this.prisma.car.delete({
      where: { id },
    });
  }

  async validateBrandsAndModelsExist() {
    const brandCount = await this.prisma.brand.count();
    const modelCount = await this.prisma.model.count();

    return { brandCount, modelCount };
  }
}
