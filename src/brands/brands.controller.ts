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
import { BrandsService } from './brands.service';
import { CreateBrandDto, UpdateBrandDto } from './dto/brand.dto';

@Controller('brands')
export class BrandsController {
  constructor(private readonly brandService: BrandsService) {}

  @Get('all')
  getAllBrands() {
    return this.brandService.getAllBrands();
  }

  // get brands data with limit amount
  @Get()
  getAllBrandsWithPagination(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return this.brandService.getAllBrandsWithPagination(+page, +limit);
  }

  @Post()
  async createBrand(@Body() brand: CreateBrandDto) {
    return await this.brandService.createBrand(brand);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() request: UpdateBrandDto,
  ) {
    return this.brandService.updateBrand(id, request);
  }
}
