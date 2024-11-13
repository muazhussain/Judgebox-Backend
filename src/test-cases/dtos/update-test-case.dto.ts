import { ApiProperty } from "@nestjs/swagger";
import { 
    IsNumber, 
    IsOptional, 
    IsString, 
    IsUUID 
} from "class-validator";

export class UpdateTestCaseDto {
    @ApiProperty({
        required: false,
        type: 'string',
        format: 'uuid',
        example: 'problem-id',
        description: 'The id of the problem',
    })
    @IsOptional()
    @IsUUID()
    problemId?: string;

    @ApiProperty({
        required: false,
        type: 'string',
        example: 'input',
        description: 'The input of the test case',
    })
    @IsOptional()
    @IsString()
    input?: string;

    @ApiProperty({
        required: false,
        type: 'string',
        example: 'output',
        description: 'The output of the test case',
    })
    @IsOptional()
    @IsString()
    output?: string;

    @ApiProperty({
        required: false,
        type: 'number',
        minimum: 1,
        example: 1,
        description: 'The order of the test case',
    })
    @IsOptional()
    @IsNumber()
    order?: number;
}