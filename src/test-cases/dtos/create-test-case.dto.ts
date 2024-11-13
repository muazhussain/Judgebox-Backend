import { ApiProperty } from "@nestjs/swagger";
import { 
    IsNumber, 
    IsString, 
    IsUUID, 
    Min
} from "class-validator";

export class CreateTestCaseDto {
    @ApiProperty({
        required: true,
        type: 'string',
        format: 'uuid',
        example: 'problem-id',
        description: 'The id of the problem',
    })
    @IsUUID()
    problemId: string;

    @ApiProperty({
        required: true,
        type: 'string',
        example: 'input',
        description: 'The input of the test case',
    })
    @IsString()
    input: string;

    @ApiProperty({
        required: true,
        type: 'string',
        example: 'output',
        description: 'The output of the test case',
    })
    @IsString()
    output: string;

    @ApiProperty({
        required: true,
        type: 'number',
        minimum: 1,
        example: 1,
        description: 'The order of the test case',
    })
    @Min(1)
    @IsNumber()
    order: number;
}