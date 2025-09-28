import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateDistrictDto {
    @ApiProperty({
        type: String,
        example: "Chilonzor tumani"
    })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({
        type: Number,
        example: 1
    })
    @IsNumber()
    @IsNotEmpty()
    region_id: number;
}
