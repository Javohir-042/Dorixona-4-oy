import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateStockDto } from './dto/create-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Stock } from './model/stock.model';
import { Pharmacies } from '../pharmacies/model/pharmacy.model';
import { Medicies } from '../medicies/model/medicy.model';
import { IResponse } from '../interfaces/success-responst';
import { getSuccessRes } from '../utils/getSuccessResponst';

@Injectable()
export class StockService {
  constructor(
    @InjectModel(Stock) private readonly stockModel: typeof Stock,
    @InjectModel(Pharmacies) private readonly pharmaciesModel: typeof Pharmacies,
    @InjectModel(Medicies) private readonly mediciesModel: typeof Medicies,
  ) { }

  async create(createStockDto: CreateStockDto): Promise<IResponse> {
    const { pharmacy_id, medicine_id, quantity } = createStockDto;

    if (!pharmacy_id || !medicine_id || !quantity) {
      throw new NotFoundException("Iltimos barchasini kiriting")
    }

    const pharmacy = await this.pharmaciesModel.findByPk(pharmacy_id)
    if (!pharmacy) {
      throw new NotFoundException("Bunday pharmacy_id mavjud emas")
    }

    const medicies = await this.mediciesModel.findByPk(medicine_id)
    if (!medicies) {
      throw new NotFoundException("Bunday medicies_id mavjud emas")
    }

    const newStock = await this.stockModel.create(createStockDto)

    return getSuccessRes(newStock, 201);
  }

  async findAll(): Promise<IResponse> {
    const stock = await this.stockModel.findAll({ include: { all: true }, order: [['id', 'ASC']] })
    return getSuccessRes(stock)
  }

  async findOne(id: number): Promise<IResponse> {
    const stockid = await this.stockModel.findByPk(id, { include: { all: true } });
    if (!stockid) {
      throw new NotFoundException("Stock not found")
    }

    return getSuccessRes(stockid)
  }

  async update(id: number, updateStockDto: UpdateStockDto): Promise<IResponse> {
    const { pharmacy_id, medicine_id } = updateStockDto

    const stockid = await this.stockModel.findByPk(id)
    if (!stockid) {
      throw new NotFoundException("Stockid not found")
    }

    if (pharmacy_id) {
      const pharmacies = await this.pharmaciesModel.findByPk(pharmacy_id)
      if (!pharmacies) {
        throw new NotFoundException("Pharmacies_id not found")
      }
    }

    if (medicine_id) {
      const medicies = await this.mediciesModel.findByPk(medicine_id)
      if (!medicies) {
        throw new NotFoundException("Medicine_id not found")
      }
    }

    const newStock = await this.stockModel.update(updateStockDto, { where: { id }, returning: true })

    return getSuccessRes(newStock[1][0])
  }

  async remove(id: number): Promise<IResponse> {
    const deletedCount = await this.stockModel.destroy({ where: { id } })
    if (!deletedCount) {
      throw new NotFoundException("Stock not found")
    }


    return getSuccessRes({})
  }
}
