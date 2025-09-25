import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MedicineTypeService } from './medicine-type.service';
import { CreateMedicineTypeDto } from './dto/create-medicine-type.dto';
import { UpdateMedicineTypeDto } from './dto/update-medicine-type.dto';

@Controller('medicine_type')
export class MedicineTypeController {
  constructor(private readonly medicineTypeService: MedicineTypeService) {}

  @Post()
  create(@Body() createMedicineTypeDto: CreateMedicineTypeDto) {
    return this.medicineTypeService.create(createMedicineTypeDto);
  }

  @Get()
  findAll() {
    return this.medicineTypeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.medicineTypeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMedicineTypeDto: UpdateMedicineTypeDto) {
    return this.medicineTypeService.update(+id, updateMedicineTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.medicineTypeService.remove(+id);
  }
}
