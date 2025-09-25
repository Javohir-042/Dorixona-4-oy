import { Module } from '@nestjs/common';
import { DistrictService } from './district.service';
import { DistrictController } from './district.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { District } from './model/district.model';
import { Region } from '../region/model/region.model';
import { Pharmacies } from '../pharmacies/model/pharmacy.model';

@Module({
  imports: [SequelizeModule.forFeature([District, Region, Pharmacies])],
  controllers: [DistrictController],
  providers: [DistrictService],
  exports: [DistrictService],
})
export class DistrictModule { }
