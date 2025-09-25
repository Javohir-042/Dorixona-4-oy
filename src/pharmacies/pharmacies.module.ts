import { Module } from '@nestjs/common';
import { PharmaciesService } from './pharmacies.service';
import { PharmaciesController } from './pharmacies.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Pharmacies } from './model/pharmacy.model';
import { Region } from '../region/model/region.model';
import { District } from '../district/model/district.model';
import { Stock } from '../stock/model/stock.model';

@Module({
  imports: [SequelizeModule.forFeature([Pharmacies, Region, District, Stock])],
  controllers: [PharmaciesController],
  providers: [PharmaciesService],
  exports: [PharmaciesService],
})
export class PharmaciesModule { }
