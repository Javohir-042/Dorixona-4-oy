import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateStockDto {
    @IsNumber()
    @IsNotEmpty()
    pharmacy_id: number;

    @IsNumber()
    @IsNotEmpty()
    medicine_id: number;

    @IsString()
    @IsNotEmpty()
    quantity: string;
}
