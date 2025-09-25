import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateMedicineTypeDto } from './dto/create-medicine-type.dto';
import { UpdateMedicineTypeDto } from './dto/update-medicine-type.dto';
import { InjectModel } from '@nestjs/sequelize';
import { MedicineType } from './model/medicine-type.model';
import { IResponse } from '../interfaces/success-responst';
import { getSuccessRes } from '../utils/getSuccessResponst';

@Injectable()
export class MedicineTypeService {
  constructor(
    @InjectModel(MedicineType) private readonly medicineTypeModel: typeof MedicineType,
  ) { }

  async create(createMedicineTypeDto: CreateMedicineTypeDto): Promise<IResponse> {
    const { name } = createMedicineTypeDto;

    if (!name) {
      throw new BadRequestException("Name kiritishi shart")
    }

    const newMedicineType = await this.medicineTypeModel.create({ name });
    return getSuccessRes(newMedicineType, 201)
  }

  async findAll(): Promise<IResponse> {
    const medicine_type = await this.medicineTypeModel.findAll({ include: { all: true } })
    return getSuccessRes(medicine_type);
  }

  async findOne(id: number): Promise<IResponse> {
    const medicine_type = await this.medicineTypeModel.findByPk(id, { include: { all: true } })
    if (!medicine_type) {
      throw new NotFoundException('Medicine_type not found')
    }

    return getSuccessRes(medicine_type)
  }

  async update(id: number, updateMedicineTypeDto: UpdateMedicineTypeDto): Promise<IResponse> {
    const medicine_type = await this.medicineTypeModel.findByPk(id)
    if (!medicine_type) {
      throw new NotFoundException('Medicine_type not found')
    }

    const tekshiruv = await this.medicineTypeModel.update(updateMedicineTypeDto, { where: { id }, returning: true })
    if (tekshiruv[0] === 0) {
      throw new NotFoundException('Medicine_type not found')
    }

    return getSuccessRes(tekshiruv)
  }

  async remove(id: number): Promise<IResponse> {
    const medicine_type = await this.medicineTypeModel.destroy({ where: { id } })
    if(!medicine_type){
      throw new NotFoundException("Medicine_type not found")
    }

    return getSuccessRes({});
  }
}
