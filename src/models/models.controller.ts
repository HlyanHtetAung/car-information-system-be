import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ModelsService } from './models.service';
import { CreateModelDto } from './dto/create-model.dto';
import { UpdateModelDto } from './dto/update-model.dto';

@Controller('models')
export class ModelsController {
  constructor(private readonly modelService: ModelsService) {}

  @Get('all')
  getAllModels() {
    return this.modelService.getAllModels();
  }

  @Get('by-brand/:brandId')
  getModlesByBrand(@Param('brandId') brandId: number) {
    return this.modelService.getModlesByBrand(+brandId);
  }

  @Get()
  getAllModelsWithPagination(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return this.modelService.getAllModelsWithPagination(+page, +limit);
  }

  @Post()
  async createModel(@Body() request: CreateModelDto) {
    return await this.modelService.createModel(request);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() request: UpdateModelDto,
  ) {
    return this.modelService.updateModel(id, request);
  }
}
