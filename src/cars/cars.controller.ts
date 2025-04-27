import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CarsService } from './cars.service';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';

@Controller('cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @Get()
  getAllCars() {
    return this.carsService.getAllCars();
  }

  @Get('check-brands-models')
  getBrandsAndModelsCount() {
    return this.carsService.validateBrandsAndModelsExist();
  }

  @Post()
  async createBrand(@Body() request: CreateCarDto) {
    try {
      return await this.carsService.createCar(request);
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
    @Body() request: UpdateCarDto,
  ) {
    return this.carsService.updateCar(id, request);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.carsService.deleteCar(id);
  }
}
