import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Region } from './model/region.model';
import { IResponse } from '../interfaces/success-responst';
import { getSuccessRes } from '../utils/getSuccessResponst';

@Injectable()
export class RegionService {
  constructor(
    @InjectModel(Region) private readonly regionModel: typeof Region,
  ) { }

  async create(createRegionDto: CreateRegionDto): Promise<IResponse> {
    const { name } = createRegionDto;

    if (!name) {
      throw new BadRequestException("Name kiritishi shart")
    }

    const newRegion = await this.regionModel.create({ name });
    return getSuccessRes(newRegion, 201)
  }

  async findAll(): Promise<IResponse> {
    const region = await this.regionModel.findAll({ include: { all: true }, order: [['id', 'ASC']] })
    return getSuccessRes(region);
  }

  async findOne(id: number): Promise<IResponse> {
    const region = await this.regionModel.findByPk(id, { include: { all: true } })
    if (!region) {
      throw new NotFoundException('region not found')
    }

    return getSuccessRes(region)
  }

  async update(id: number, updateRegionDto: UpdateRegionDto): Promise<IResponse> {
    const region = await this.regionModel.findByPk(id)
    if (!region) {
      throw new NotFoundException('region not found')
    }

    const tekshiruv = await this.regionModel.update(updateRegionDto, { where: { id }, returning: true })
    if (tekshiruv[0] === 0) {
      throw new NotFoundException('region not found')
    }

    return getSuccessRes(tekshiruv)
  }

  async remove(id: number): Promise<IResponse> {
    const region = await this.regionModel.destroy({ where: { id } })
    if (!region) {
      throw new NotFoundException("region not found")
    }

    return getSuccessRes({});
  }
}
