import { Module } from '@nestjs/common';
import { MedicineTypeService } from './medicine-type.service';
import { MedicineTypeController } from './medicine-type.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { MedicineType } from './model/medicine-type.model';
import { Medicies } from '../medicies/model/medicy.model';

@Module({
  imports: [SequelizeModule.forFeature([MedicineType, Medicies])],
  controllers: [MedicineTypeController],
  providers: [MedicineTypeService],
  exports: [MedicineTypeService],
})
export class MedicineTypeModule { }
