import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, Min, Max, IsOptional, IsUUID } from "class-validator";

export class GetContestProblemsDto {
    @ApiProperty({
        required: false,
        type: 'number',
        minimum: 0,
        maximum: 50,
        example: 10,
        default: 10,
        description: 'The number of problems to return',
    })
    @IsNumber()
    @Min(0)
    @Max(50)
    @IsOptional()
    limit?: number;

    @ApiProperty({
        required: false,
        type: 'number',
        minimum: 1,
        default: 1,
        example: 1,
        description: 'The page number to return',
    })
    @IsNumber()
    @Min(1)
    @IsOptional()
    page?: number;

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
}