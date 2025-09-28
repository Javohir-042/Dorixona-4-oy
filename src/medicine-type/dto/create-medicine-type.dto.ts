import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateMedicineTypeDto {
    @ApiProperty({
        type: String,
        example: 'Tabletka'
    })
    @IsString()
    @IsNotEmpty()
    name: string;
}
