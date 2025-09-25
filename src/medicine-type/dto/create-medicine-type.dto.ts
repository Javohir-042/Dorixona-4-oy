import { IsNotEmpty, IsString } from "class-validator";

export class CreateMedicineTypeDto {
    @IsString()
    @IsNotEmpty()
    name: string;
}
