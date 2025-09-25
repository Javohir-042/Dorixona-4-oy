import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateDistrictDto } from './dto/create-district.dto';
import { UpdateDistrictDto } from './dto/update-district.dto';
import { InjectModel } from '@nestjs/sequelize';
import { District } from './model/district.model';
import { Region } from '../region/model/region.model';
import { IResponse } from '../interfaces/success-responst';
import { getSuccessRes } from '../utils/getSuccessResponst';

@Injectable()
export class DistrictService {
  constructor(
    @InjectModel(District) private readonly districtModel: typeof District,
    @InjectModel(Region) private readonly regionModel: typeof Region,
  ) { }

  async create(createDistrictDto: CreateDistrictDto): Promise<IResponse> {
    const { name, region_id } = createDistrictDto;

    if (!name) {
      throw new BadRequestException("Name kiritish shart")
    }

    if (!region_id) {
      throw new BadRequestException("Region_id kiritish shart")
    }

    const existsRegion = await this.regionModel.findByPk(region_id)
    if (!existsRegion) {
      throw new NotFoundException("Bunday region_id topilmadi")
    }

    const newMedicies = await this.districtModel.create({ ...createDistrictDto })

    return getSuccessRes(newMedicies, 201)
  }

  async findAll(): Promise<IResponse> {
    const district = await this.districtModel.findAll({ include: { all: true } })
    return getSuccessRes(district);
  }

  async findOne(id: number): Promise<IResponse> {
    const district = await this.districtModel.findByPk(id, { include: { all: true } })
    if (!district) {
      throw new NotFoundException("District not found")
    }

    return getSuccessRes(district);
  }

  async update(id: number, updateDistrictDto: UpdateDistrictDto): Promise<IResponse> {
    const { region_id } = updateDistrictDto;

    const district = await this.districtModel.findByPk(id)
    if (!district) {
      throw new NotFoundException("District not found")
    }

    const existsRegion = await this.regionModel.findByPk(region_id)
    if (!existsRegion) {
      throw new NotFoundException("Region not found")
    }

    const districtd = await this.districtModel.update(updateDistrictDto, { where: { id }, returning: true })
    return getSuccessRes(districtd[1][0])
  }

  async remove(id: number): Promise<IResponse> {
    const district = await this.districtModel.destroy({ where: { id } })
    if(!district){
      throw new NotFoundException("District not found")
    }

    return getSuccessRes({})
  }
}
