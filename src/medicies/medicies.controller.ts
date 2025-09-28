import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MediciesService } from './medicies.service';
import { CreateMedicyDto } from './dto/create-medicy.dto';
import { UpdateMedicyDto } from './dto/update-medicy.dto';
import { ApiBody, ApiOperation } from '@nestjs/swagger';

@Controller('medicies')
export class MediciesController {
  constructor(private readonly mediciesService: MediciesService) {}


  @Post()
  create(@Body() createMedicyDto: CreateMedicyDto) {
    return this.mediciesService.create(createMedicyDto);
  }

  @Get()
  findAll() {
    return this.mediciesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mediciesService.findOne(+id);
  }

  @ApiOperation({ summary: `Dorining ma'lumotlarini yangilash`})
  @ApiBody({ type: UpdateMedicyDto })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMedicyDto: UpdateMedicyDto) {
    return this.mediciesService.update(+id, updateMedicyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.mediciesService.remove(+id);
  }
}
