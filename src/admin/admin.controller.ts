import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Roles } from '../common/decorator/roles-decorator';
import { Role } from '../common/enum/admin-enum';
import { AuthGuard } from '../common/guard/auth.guard';
import { RolesGuard } from '../common/guard/roles.guard';

@UseGuards(AuthGuard, RolesGuard)
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) { }

  @Roles(Role.ADMIN)
  @Post()
  @ApiBearerAuth()
  create(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.create(createAdminDto);
  }

  @Roles(Role.ADMIN)
  @Get()
  @ApiBearerAuth()
  findAll() {
    return this.adminService.findAll();
  }

  @Roles(Role.ADMIN)
  @Get(':id')
  @ApiBearerAuth()
  findOne(@Param('id') id: string) {
    return this.adminService.findOne(+id);
  }

  @Roles(Role.ADMIN)
  @Patch(':id')
  @ApiBearerAuth()
  update(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminService.update(+id, updateAdminDto);
  }

  @Roles(Role.ADMIN)
  @Delete(':id')
  @ApiBearerAuth()
  remove(@Param('id') id: string) {
    return this.adminService.remove(+id);
  }
}
