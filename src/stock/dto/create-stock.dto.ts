import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, Min } from "class-validator";

export class CreateStockDto {
    @ApiProperty({
        type: Number,
        example: "Pharmaxy_id",
    })
    @IsNumber()
    @IsNotEmpty()
    pharmacy_id: number;

    @ApiProperty({
        type: Number,
        example: 'Medicine_id'
    })
    @IsNumber()
    @IsNotEmpty()
    medicine_id: number;

    @ApiProperty({
        type: Number,
        example: 10    
    })
    @IsNumber()
    @Min(1)
    @IsNotEmpty()
    quantity: number;
}
