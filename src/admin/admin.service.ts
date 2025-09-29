import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Admin } from './model/admin.model';
import { IResponse } from '../interfaces/success-responst';
import { getSuccessRes } from '../utils/getSuccessResponst';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Admin) private readonly adminModel: typeof Admin
  ) { }

  async create(createAdminDto: CreateAdminDto): Promise<IResponse> {
    const { name, email, password, is_Active, role } = createAdminDto
    if (!name || !email || !password || !is_Active || !role) {
      throw new NotFoundException("Barchasini kiriting")
    }
    console.log(email)

    const existsEmail = await this.adminModel.findOne({ where: { email } })
    if (existsEmail) {
      throw new BadRequestException("Bunday email mavjud")
    }

    const newAdmin = await this.adminModel.create({ ...createAdminDto })

    return getSuccessRes(newAdmin, 201)
  }

  async findAll(): Promise<IResponse> {
    const admin = await this.adminModel.findAll({ include: { all: true }, order: [["id", "ASC"]] })

    return getSuccessRes(admin);
  }

  async findOne(id: number): Promise<IResponse> {
    const admin = await this.adminModel.findByPk(id);
    if (!admin) {
      throw new NotFoundException(" Admin not found")
    }

    return getSuccessRes(admin)
  }

  async update(id: number, updateAdminDto: UpdateAdminDto): Promise<IResponse> {
    const admin = await this.adminModel.findByPk(id)
    if (!admin) {
      throw new NotFoundException("Admin not found")
    }

    const { email } = updateAdminDto;

    const exsistEmail = await this.adminModel.findOne({ where: { email } })
    if (!exsistEmail) {
      throw new NotFoundException("Email not found")
    }

    const adminUpdate = await this.adminModel.update(updateAdminDto, { where: { id }, returning: true });

    return getSuccessRes(adminUpdate[1][0])
  }

  async remove(id: number) {
    const adminId = await this.adminModel.destroy({ where: { id } })
    if (!adminId) {
      return getSuccessRes({ message: "Bunday admin mavjud emas" })
    }
    return getSuccessRes({ message: {} })
  }
}
