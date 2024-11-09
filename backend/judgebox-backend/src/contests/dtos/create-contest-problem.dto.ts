import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsUUID } from "class-validator";

export class CreateContestProblemDto {
    @ApiProperty({
        required: true,
        type: 'string',
        format: 'uuid',
        example: 'contest-id',
        description: 'The id of the contest',
    })
    @IsUUID()
    contest: string;

    @ApiProperty({
        required: true,
        type: 'string',
        format: 'uuid',
        example: 'problem-id',
        description: 'The id of the problem',
    })
    @IsUUID()
    problem: string;

    @ApiProperty({
        required: true,
        type: 'number',
        minimum: 1,
        example: 1,
        description: 'The order of the problem in the contest',
    })
    @IsNumber()
    problemOrder: number;
}