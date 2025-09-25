import { Module } from '@nestjs/common';
import { MediciesService } from './medicies.service';
import { MediciesController } from './medicies.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Medicies } from './model/medicy.model';
import { MedicineType } from '../medicine-type/model/medicine-type.model';
import { Stock } from '../stock/model/stock.model';

@Module({
  imports: [SequelizeModule.forFeature([Medicies, MedicineType, Stock])],
  controllers: [MediciesController],
  providers: [MediciesService],
  exports: [MediciesService],
})
export class MediciesModule {}
