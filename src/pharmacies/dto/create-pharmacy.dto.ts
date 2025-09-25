import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreatePharmacyDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    address: string;

    @IsString()
    @IsNotEmpty()
    location: string;

    @IsString()
    @IsNotEmpty()
    phone: string;

    @IsString()
    @IsNotEmpty()
    email: string;

    @IsNumber()
    @IsNotEmpty()
    region_id: number;

    @IsNumber()
    @IsNotEmpty()
    district_id
}
