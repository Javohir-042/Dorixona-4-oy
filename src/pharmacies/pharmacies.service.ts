import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePharmacyDto } from './dto/create-pharmacy.dto';
import { UpdatePharmacyDto } from './dto/update-pharmacy.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Pharmacies } from './model/pharmacy.model';
import { Region } from '../region/model/region.model';
import { District } from '../district/model/district.model';
import { IResponse } from '../interfaces/success-responst';
import { getSuccessRes } from '../utils/getSuccessResponst';
@Injectable()
export class PharmaciesService {
  constructor(
    @InjectModel(Pharmacies) private readonly pharmaciesModel: typeof Pharmacies,
    @InjectModel(Region) private readonly regionModel: typeof Region,
    @InjectModel(District) private readonly districtModel: typeof District,
  ) { }

  async create(createPharmacyDto: CreatePharmacyDto): Promise<IResponse> {
    const { name, address, location, phone, email, region_id, district_id } = createPharmacyDto;

    if (!name || !address || !location || !phone || !email || !region_id || !district_id) {
      throw new BadRequestException("Iltimos barcha malumotlarni kiriting")
    }

    const regionid = await this.regionModel.findByPk(region_id)
    if (!regionid) {
      throw new NotFoundException("Bunday Region_id topilmadi")
    }

    const districtId = await this.districtModel.findByPk(district_id)
    if (!districtId) {
      throw new NotFoundException("Bunday DistrictId topilmadi")
    }

    const existsAddress = await this.pharmaciesModel.findOne({ where: { address } })
    if (existsAddress) {
      throw new BadRequestException('Bunday Addres mavjud')
    }

    const existsPhone = await this.pharmaciesModel.findOne({ where: { phone } })
    if (existsPhone) {
      throw new BadRequestException("Bunday phone mavjud")
    }

    const existsEmail = await this.pharmaciesModel.findOne({ where: { email } })
    if (existsEmail) {
      throw new BadRequestException("Bunday Email mavjud")
    }

    const newPharmacy = await this.pharmaciesModel.create({ ...createPharmacyDto })

    return getSuccessRes(newPharmacy, 201)
  }

  async findAll(): Promise<IResponse> {
    const pharmacies = await this.pharmaciesModel.findAll({ include: { all: true }, order: [['id', 'ASC']] })
    return getSuccessRes(pharmacies)
  }

  async findOne(id: number): Promise<IResponse> {
    const pharmacies = await this.pharmaciesModel.findByPk(id, { include: { all: true } })
    if (!pharmacies) {
      throw new NotFoundException("Pharmacies not found")
    }

    return getSuccessRes(pharmacies)
  }

  async update(id: number, updatePharmacyDto: UpdatePharmacyDto): Promise<IResponse> {
    const pharmacies = await this.pharmaciesModel.findByPk(id)
    if (!pharmacies) {
      throw new NotFoundException("pharmacies not found")
    }

    const { address, phone, email, region_id, district_id } = updatePharmacyDto;

    if (address) {
      const existsAddress = await this.pharmaciesModel.findOne({ where: { address } })
      if (existsAddress && existsAddress.id !== id) {
        throw new BadRequestException('Bunday address mavjud')
      }
    }

    if (phone) {
      const existsPhone = await this.pharmaciesModel.findOne({ where: { phone } })
      if (existsPhone && existsPhone.id !== id) {
        throw new BadRequestException("Bunday phone mavjud")
      }
    }

    if (email) {
      const existsEmail = await this.pharmaciesModel.findOne({ where: { email } })
      if (existsEmail && existsEmail.id !== id) {
        throw new BadRequestException("Bunday email mavjud")
      }
    }

    const region_ID = await this.regionModel.findByPk(region_id)
    if (!region_ID) {
      throw new NotFoundException('Bunday Region_id topilmadi')
    }

    const district_ID = await this.districtModel.findByPk(district_id)
    if (!district_ID) {
      throw new NotFoundException('Bunday District_id topilmadi')
    }

    const pharmaciesd = await this.pharmaciesModel.update(updatePharmacyDto, { where: { id }, returning: true })

    return getSuccessRes(pharmaciesd[1][0])
  }

  async remove(id: number): Promise<IResponse> {
    const pharmacies = await this.pharmaciesModel.destroy({ where: { id } })
    if (!pharmacies) {
      throw new NotFoundException("pharmacies not found")
    }

    return getSuccessRes({})
  }
}
