import { ApiProperty } from "@nestjs/swagger";
import {
    IsString,
    IsUUID
} from "class-validator";

export class CreateSubmissionDto {
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
        type: 'string',
        format: 'uuid',
        example: 'participant-id',
        description: 'The id of the participant',
    })
    @IsUUID()
    participant: string;

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
        example: 'language',
        description: 'The language of the submission',
    })
    @IsString()
    language: string;

    @ApiProperty({
        required: true,
        type: 'string',
        example: 'source code',
        description: 'The source code of the submission',
    })
    @IsString()
    sourceCode: string;
}