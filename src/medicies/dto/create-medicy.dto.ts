import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateMedicyDto {
    @ApiProperty({
        type: String,
        example: 'Paracetamol'
    })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({
        type: String,
        example: 'Uzpharm',
        description: 'Zavod nomi'
    })
    @IsString()
    @IsNotEmpty()
    manufacturer: string;           // Zavod nomi 

    @ApiProperty({
        type: Number,
        example: 1,
    })
    @IsNumber()
    @IsNotEmpty()
    medicine_type_id: number;

    @ApiProperty({
        type: Number,
        example: 12000
    })
    @IsNumber()
    @IsNotEmpty()
    price: number;

    @ApiProperty({
        type: String,
        example: '2026-05-20'
    })
    @IsDateString()
    @IsNotEmpty()
    expiry_date: string;            // bu dorining yaroqliligi tugash muddati 
    
    @ApiProperty({
        type: String,
        example: "Paracetamol isitmani tushiradi va bosh og'rig'ini kamaytiradi."
    })
    @IsString()
    @IsNotEmpty()
    info: string;                   // bu doriga oid qoshimcha malumot
}
