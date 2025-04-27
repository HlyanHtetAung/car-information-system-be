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
} from '@nestjs/common';
import { ModelsService } from './models.service';
import { CreateModelDto, UpdateModelDto } from './dto/model.dto';

@Controller('models')
export class ModelsController {
  constructor(private readonly modelService: ModelsService) {}

  @Get()
  getAllModels() {
    try {
      return this.modelService.getAllModels();
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
