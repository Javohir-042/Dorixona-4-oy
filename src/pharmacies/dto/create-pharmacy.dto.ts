import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreatePharmacyDto {
    @ApiProperty({
        type: String,
        example: "Paracetamol"
    })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({
        type: String,
        example: 'Chilonzor tupani'
    })
    @IsString()
    @IsNotEmpty()
    address: string;

    @ApiProperty({
        type: String,
        example: "Toshkent shahri, Chilonzor tumani"
    })
    @IsString()
    @IsNotEmpty()
    location: string;

    @ApiProperty({
        type: String,
        example: '+998976006787'
    })
    @IsString()
    @IsNotEmpty()
    phone: string;

    @ApiProperty({
        type: String,
        example: 'javohirquromboyev933@gmail.com'
    })
    @IsString()
    @IsNotEmpty()
    email: string;

    @ApiProperty({
        type: Number,
        example: 1
    })
    @IsNumber()
    @IsNotEmpty()
    region_id: number;

    @ApiProperty({
        type: Number,
        example: 1
    })
    @IsNumber()
    @IsNotEmpty()
    district_id: number
}
