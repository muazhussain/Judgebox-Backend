import { ApiProperty } from "@nestjs/swagger";
import { 
    IsNumber, 
    IsOptional, 
    IsString, 
    Max, 
    MaxLength, 
    Min, 
    MinLength 
} from "class-validator";

export class UpdateProblemDto {
    @ApiProperty({
        required: false,
        type: 'string',
        minLength: 2,
        maxLength: 50,
        description: 'Title of the problem',
        example: 'Problem 1',
    })
    @IsOptional()
    @IsString()
    @MinLength(2)
    @MaxLength(50)
    title?: string;

    @ApiProperty({
        required: false,
        type: 'string',
        minLength: 2,
        maxLength: 1000,
        description: 'Description of the problem',
        example: 'Problem 1',
    })
    @IsOptional()
    @IsString()
    @MinLength(2)
    @MaxLength(1000)
    description?: string;

    @ApiProperty({
        required: false,
        type: 'string',
        minLength: 2,
        maxLength: 500,
        description: 'Input format of the problem',
        example: 'Problem 1',
    })
    @IsOptional()
    @IsString()
    @MinLength(2)
    @MaxLength(500)
    inputFormat?: string;

    @ApiProperty({
        required: false,
        type: 'string',
        minLength: 2,
        maxLength: 500,
        description: 'Output format of the problem',
        example: 'Problem 1',
    })
    @IsOptional()
    @IsString()
    @MinLength(2)
    @MaxLength(500)
    outputFormat?: string;

    @ApiProperty({
        required: false,
        type: 'string',
        minLength: 2,
        maxLength: 500,
        description: 'Constraints of the problem',
        example: 'Problem 1',
    })
    @IsOptional()
    @IsString()
    @MinLength(2)
    @MaxLength(500)
    constraints?: string;

    @ApiProperty({
        required: false,
        type: 'string',
        maxLength: 5000,
        description: 'Test cases of the problem',
        example: 'Problem 1',
    })
    @IsOptional()
    @IsString()
    @MaxLength(5000)
    testCases?: string;

    @ApiProperty({
        required: false,
        type: 'number',
        minimum: 1,
        maximum: 10,
        description: 'Time limit of the problem',
        example: 1,
        default: 1,
    })
    @IsOptional()
    @IsNumber()
    @Min(1)
    @Max(10)
    timeLimit?: number;

    @ApiProperty({
        required: false,
        type: 'number',
        minimum: 1,
        maximum: 256,
        description: 'Memory limit of the problem',
        example: 1,
        default: 1,
    })
    @IsOptional()
    @IsNumber()
    @Min(1)
    @Max(256)
    memoryLimit?: number;
}