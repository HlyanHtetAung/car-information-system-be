import {
  Body,
  Controller,
  Delete,
  Get,
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

  // checking the counts of brands and models
  @Get('check-brands-models')
  getBrandsAndModelsCount() {
    return this.carsService.validateBrandsAndModelsExist();
  }

  // checking the registarion number is already exist to prevent duplicate
  @Post('check-registration-number')
  async checkRegistrationNumberAlreadyExist(
    @Body() registrationNumber: string,
  ) {
    return this.carsService.checkRegistrationNumberAlreadyExist(
      registrationNumber,
    );
  }

  @Post()
  async createBrand(@Body() request: CreateCarDto) {
    return await this.carsService.createCar(request);
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
