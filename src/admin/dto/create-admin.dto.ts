import { IsBoolean, IsEmail, IsNotEmpty, IsString, IsStrongPassword } from "class-validator";
import { Role } from "../../common/enum/admin-enum";
import { ApiProperty } from "@nestjs/swagger";

export class CreateAdminDto {
    @ApiProperty({
        type: String,
        example: "Javohir"
    })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({
        type: String,
        example: 'javohirquromboyev933@gmail.com',
        required: true
    })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({
        type: String,
        example: 'Javohir123!',
        required: true
    })
    @IsStrongPassword()
    @IsNotEmpty()
    password: string;

    @ApiProperty({
        type: String,
        example: true
    })
    @IsBoolean()
    @IsNotEmpty()
    is_Active: boolean

    @ApiProperty({
        type: String,
        example: "ADMIN"
    })
    @IsString()
    @IsNotEmpty()
    role: Role;
}
