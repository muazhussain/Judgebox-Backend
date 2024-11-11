import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsUUID } from "class-validator";

export class UpdateContestProblemDto {
    @ApiProperty({
        required: false,
        type: 'string',
        format: 'uuid',
        example: 'contest-id',
        description: 'The id of the contest',
    })
    @IsOptional()
    @IsUUID()
    contest?: string;

    @ApiProperty({
        required: false,
        type: 'string',
        format: 'uuid',
        example: 'problem-id',
        description: 'The id of the problem',
    })
    @IsOptional()
    @IsUUID()
    problem?: string;

    @ApiProperty({
        required: false,
        type: 'number',
        minimum: 1,
        example: 1,
        description: 'The order of the problem in the contest',
    })
    @IsOptional()
    @IsNumber()
    problemOrder?: number;
}