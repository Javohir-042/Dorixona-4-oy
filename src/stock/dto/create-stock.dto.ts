import { IsNotEmpty, IsNumber, Min } from "class-validator";

export class CreateStockDto {
    @IsNumber()
    @IsNotEmpty()
    pharmacy_id: number;

    @IsNumber()
    @IsNotEmpty()
    medicine_id: number;

    @IsNumber()
    @Min(1)
    @IsNotEmpty()
    quantity: number;
}
