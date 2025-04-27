import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { CarsModule } from './cars/cars.module';
import { BrandsModule } from './brands/brands.module';
import { ModelsModule } from './models/models.module';

@Module({
  imports: [PrismaModule, CarsModule, BrandsModule, ModelsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
