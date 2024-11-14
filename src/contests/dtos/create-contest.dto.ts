import { ApiProperty } from "@nestjs/swagger";
import {
    IsString,
    IsUUID,
    MaxLength,
    MinLength
} from "class-validator";

export class CreateContestDto {
    @ApiProperty({
        required: true,
        type: 'string',
        minLength: 2,
        maxLength: 50,
        example: 'Contest name',
        description: 'The name of the contest',
    })
    @IsString()
    @MinLength(2)
    @MaxLength(50)
    name: string;

    @ApiProperty({
        required: true,
        type: 'string',
        minLength: 2,
        maxLength: 200,
        example: 'Contest description',
        description: 'The description of the contest',
    })
    @IsString()
    @MinLength(2)
    @MaxLength(200)
    description: string;

    @ApiProperty({
        required: true,
        type: 'string',
        example: 'YYYY-MM-DD HH:mm:ss',
        description: 'The start time of the contest',
    })
    @IsString()
    startTime: string;

    @ApiProperty({
        required: true,
        type: 'string',
        example: 'YYYY-MM-DD HH:mm:ss',
        description: 'The end time of the contest',
    })
    @IsString()
    endTime: string;

    @ApiProperty({
        required: true,
        type: 'string',
        format: 'uuid',
        example: 'user-id',
        description: 'Contest host',
    })
    @IsUUID()
    createdBy: string;
}