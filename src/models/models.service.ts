import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateModelDto, UpdateModelDto } from './dto/model.dto';

@Injectable()
export class ModelsService {
  constructor(private prisma: PrismaService) {}

  async getAllModels() {
    return await this.prisma.model.findMany({
      include: {
        brand: true,
      },
    });
  }

  async createModel(request: CreateModelDto) {
    const { name, brandId } = request;
    return await this.prisma.model.create({
      data: { name, brandId },
    });
  }

  async updateModel(id: number, request: UpdateModelDto) {
    return this.prisma.model.update({
      where: { id },
      data: request,
    });
  }
}
