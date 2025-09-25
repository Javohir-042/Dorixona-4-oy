import { Module } from '@nestjs/common';
import { RegionService } from './region.service';
import { RegionController } from './region.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Region } from './model/region.model';
import { District } from '../district/model/district.model';
import { Pharmacies } from '../pharmacies/model/pharmacy.model';

@Module({
  imports: [SequelizeModule.forFeature([Region, District, Pharmacies])],
  controllers: [RegionController],
  providers: [RegionService],
  exports: [RegionService]
})
export class RegionModule { }
