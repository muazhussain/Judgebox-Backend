import { ApiProperty } from "@nestjs/swagger";
import {
    IsString,
    MinLength,
    MaxLength,
    IsEmail
} from "class-validator";

export class RegisterDto {
    @ApiProperty({
        required: true,
        type: 'string',
        minLength: 2,
        maxLength: 50,
        example: 'John',
        description: 'The first name of the user',
    })
    @IsString()
    @MinLength(2)
    @MaxLength(50)
    name: string;

    @ApiProperty({
        required: true,
        type: 'string',
        example: 'user@example.com',
        description: 'The email of the user',
    })
    @IsEmail()
    email: string;

    @ApiProperty({
        required: true,
        type: 'string',
        minLength: 5,
        maxLength: 50,
        example: 'password',
        description: 'The password of the user',
    })
    @IsString()
    @MinLength(5)
    @MaxLength(50)
    password: string;
}