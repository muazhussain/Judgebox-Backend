import { ApiProperty } from "@nestjs/swagger";
import {
    IsNumber,
    IsString,
    IsUUID,
    Max,
    MaxLength,
    Min,
    MinLength
} from "class-validator";

export class CreateProblemDto {
    @ApiProperty({
        required: true,
        type: 'string',
        minLength: 2,
        maxLength: 50,
        description: 'Title of the problem',
        example: 'Problem 1',
    })
    @IsString()
    @MinLength(2)
    @MaxLength(50)
    title: string;

    @ApiProperty({
        required: true,
        type: 'string',
        minLength: 2,
        maxLength: 1000,
        description: 'Description of the problem',
        example: 'Problem 1',
    })
    @IsString()
    @MinLength(2)
    @MaxLength(1000)
    description: string;

    @ApiProperty({
        required: true,
        type: 'string',
        minLength: 2,
        maxLength: 500,
        description: 'Input format of the problem',
        example: 'Problem 1',
    })
    @IsString()
    @MinLength(2)
    @MaxLength(500)
    inputFormat: string;

    @ApiProperty({
        required: true,
        type: 'string',
        minLength: 2,
        maxLength: 500,
        description: 'Output format of the problem',
        example: 'Problem 1',
    })
    @IsString()
    @MinLength(2)
    @MaxLength(500)
    outputFormat: string;

    @ApiProperty({
        required: true,
        type: 'string',
        minLength: 2,
        maxLength: 500,
        description: 'Constraints of the problem',
        example: 'Problem 1',
    })
    @IsString()
    @MinLength(2)
    @MaxLength(500)
    constraints: string;

    @ApiProperty({
        required: true,
        type: 'string',
        format: 'json',
        maxLength: 5000,
        description: 'Test cases of the problem',
        example: 'Problem 1',
    })
    @IsString()
    @MaxLength(5000)
    testCases: string;

    @ApiProperty({
        required: true,
        type: 'number',
        minimum: 1,
        maximum: 10,
        description: 'Time limit of the problem',
        example: 1,
        default: 1,
    })
    @IsNumber()
    @Min(1)
    @Max(10)
    timeLimit: number;

    @ApiProperty({
        required: true,
        type: 'number',
        minimum: 1,
        maximum: 256,
        description: 'Memory limit of the problem',
        example: 1,
        default: 1,
    })
    @IsNumber()
    @Min(1)
    @Max(256)
    memoryLimit: number;

    @ApiProperty({
        required: true,
        type: 'string',
        format: 'uuid',
        example: 'Creater-id',
        description: 'Creator of the problem',
    })
    @IsUUID()
    createdBy: string;
}