import { 
    IsBoolean, 
    IsEmail, 
    IsOptional, 
    IsString 
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ToBoolean } from 'src/utils/custom-transform';

export class LoginDto {
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
    password: string;

    @ApiProperty({
        required: false,
        default: false,
        type: 'boolean',
        description: 'Remember me',
    })
    @IsBoolean()
    @ToBoolean()
    @IsOptional()
    rememberMe?: boolean;
}