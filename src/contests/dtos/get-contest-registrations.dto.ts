import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, Min, Max, IsOptional, IsUUID } from "class-validator";

export class GetContestRegistrationsDto {
    @ApiProperty({
        required: false,
        type: 'number',
        minimum: 0,
        maximum: 50,
        example: 10,
        default: 10,
        description: 'The number of registrations to return',
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
        example: 'participant-id',
        description: 'The id of the participant',
    })
    @IsUUID()
    @IsOptional()
    participant?: string;

    @ApiProperty({
        required: false,
        type: 'string',
        format: 'uuid',
        example: 'contest-id',
        description: 'The id of the contest',
    })
    @IsUUID()
    @IsOptional()
    contest?: string;
}