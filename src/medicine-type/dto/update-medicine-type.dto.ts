
import { PartialType } from '@nestjs/swagger';
import { CreateMedicineTypeDto } from './create-medicine-type.dto';

export class UpdateMedicineTypeDto extends PartialType(CreateMedicineTypeDto) {}
