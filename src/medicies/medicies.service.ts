import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateMedicyDto } from './dto/create-medicy.dto';
import { UpdateMedicyDto } from './dto/update-medicy.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Medicies } from './model/medicy.model';
import { IResponse } from '../interfaces/success-responst';
import { getSuccessRes } from '../utils/getSuccessResponst';
import { MedicineType } from '../medicine-type/model/medicine-type.model';

@Injectable()
export class MediciesService {
  constructor(
    @InjectModel(Medicies) private readonly mediciesModel: typeof Medicies,
    @InjectModel(MedicineType) private readonly medicineTypeModel: typeof MedicineType,
  ) { }

  async create(createMedicyDto: CreateMedicyDto): Promise<IResponse> {
    const { name, manufacturer, medicine_type_id, price, expiry_date, info } = createMedicyDto;

    if (!name || !manufacturer || !medicine_type_id || !price || !expiry_date || !info) {
      throw new NotFoundException("Iltimos barchasini kiriting")
    }

    const existsMedicineType = await this.medicineTypeModel.findByPk(medicine_type_id)
    if (!existsMedicineType) {
      throw new NotFoundException("Bunda medicine_type_id topilmadi ")
    }

    const newMedicies = await this.mediciesModel.create({ ...createMedicyDto })
    return getSuccessRes(newMedicies, 201);
  }

  async findAll(): Promise<IResponse> {
    const medicies = await this.mediciesModel.findAll({ include: { all: true } })
    return getSuccessRes(medicies)
  }

  async findOne(id: number): Promise<IResponse> {
    const medicies = await this.mediciesModel.findByPk(id, { include: { all: true } })
    if (!medicies) {
      throw new NotFoundException("Medicies not found")
    }

    return getSuccessRes(medicies)
  }

  async update(id: number, updateMedicyDto: UpdateMedicyDto): Promise<IResponse> {
    const { medicine_type_id } = updateMedicyDto;

    const medicies = await this.mediciesModel.findByPk(id)
    if (!medicies) {
      throw new NotFoundException("Medicies not found")
    }

    const existsMedicineType = await this.medicineTypeModel.findByPk(medicine_type_id)
    if (!existsMedicineType) {
      throw new NotFoundException("MedicineType not found")
    }

    const mediciesd = await this.mediciesModel.update(updateMedicyDto, { where: { id }, returning: true })

    return getSuccessRes(mediciesd[1][0])
  }

  async remove(id: number): Promise<IResponse> {
    const medicies = await this.mediciesModel.destroy({ where: { id }})
    if(!medicies){
      throw new NotFoundException("medicies not found")
    }

    return getSuccessRes({})
  }
}
