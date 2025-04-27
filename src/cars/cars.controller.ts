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
  Query,
} from '@nestjs/common';
import { CarsService } from './cars.service';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';

@Controller('cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  // getting all cars data
  @Get('all')
  getAllCars() {
    return this.carsService.getAllCars();
  }

  // get brands data with limit amount
  @Get()
  getAllCarsWithPagination(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('search') search: string = '',
  ) {
    return this.carsService.getAllCarsWithPagination(+page, +limit, search);
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
