import { Module } from '@nestjs/common';
import { StockService } from './stock.service';
import { StockController } from './stock.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Stock } from './model/stock.model';
import { Pharmacies } from '../pharmacies/model/pharmacy.model';
import { Medicies } from '../medicies/model/medicy.model';

@Module({
  imports: [SequelizeModule.forFeature([Stock, Pharmacies, Medicies])],
  controllers: [StockController],
  providers: [StockService],
  exports: [StockService],
})
export class StockModule {}
