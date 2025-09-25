import { IsDateString, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateMedicyDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    manufacturer: string;

    @IsNumber()
    @IsNotEmpty()
    medicine_type_id: number;

    @IsNumber()
    @IsNotEmpty()
    price: number;

    @IsDateString()
    @IsNotEmpty()
    expiry_date: string;
    
    @IsString()
    @IsNotEmpty()
    info: string;
}
