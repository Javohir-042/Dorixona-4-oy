
import { PartialType } from '@nestjs/swagger';
import { CreateMedicyDto } from './create-medicy.dto';

export class UpdateMedicyDto extends PartialType(CreateMedicyDto) {}
