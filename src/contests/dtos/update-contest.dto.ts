import { ApiProperty } from "@nestjs/swagger";
import { 
    IsString, 
    MinLength, 
    MaxLength, 
    IsOptional 
} from "class-validator";

export class UpdateContestDto {
    @ApiProperty({
        required: false,
        type: 'string',
        minLength: 2,
        maxLength: 50,
        example: 'Contest name',
        description: 'The name of the contest',
    })
    @IsOptional()
    @IsString()
    @MinLength(2)
    @MaxLength(50)
    name?: string;

    @ApiProperty({
        required: false,
        type: 'string',
        minLength: 2,
        maxLength: 200,
        example: 'Contest description',
        description: 'The description of the contest',
    })
    @IsOptional()
    @IsString()
    @MinLength(2)
    @MaxLength(200)
    description?: string;

    @ApiProperty({
        required: false,
        type: 'string',
        example: 'Contest start time',
        description: 'The start time of the contest',
    })
    @IsOptional()
    @IsString()
    startTime?: string;

    @ApiProperty({
        required: false,
        type: 'string',
        example: 'Contest end time',
        description: 'The end time of the contest',
    })
    @IsOptional()
    @IsString()
    endTime?: string;
}