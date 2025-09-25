import { PartialType } from '@nestjs/mapped-types';
import { CreateMedicyDto } from './create-medicy.dto';

export class UpdateMedicyDto extends PartialType(CreateMedicyDto) {}
