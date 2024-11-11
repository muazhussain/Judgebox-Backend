import { ApiProperty } from "@nestjs/swagger";
import { IsString, MinLength, MaxLength, IsOptional } from "class-validator";

export class UpdateUserDto {
    @ApiProperty({
        required: false,
        type: 'string',
        minLength: 2,
        maxLength: 50,
        example: 'John',
        description: 'The first name of the user',
    })
    @IsString()
    @MinLength(2)
    @MaxLength(50)
    @IsOptional()
    name?: string;
}