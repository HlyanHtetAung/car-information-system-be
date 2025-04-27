import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
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

  @Get()
  getAllModelsWithPagination(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return this.modelService.getAllModelsWithPagination(+page, +limit);
  }

  @Post()
  async createModel(@Body() request: CreateModelDto) {
    try {
      return await this.modelService.createModel(request);
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

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() request: UpdateModelDto,
  ) {
    return this.modelService.updateModel(id, request);
  }
}
