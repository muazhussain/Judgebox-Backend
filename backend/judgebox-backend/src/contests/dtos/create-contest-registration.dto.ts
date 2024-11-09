import { ApiProperty } from "@nestjs/swagger";
import { IsUUID } from "class-validator";

export class CreateContestRegistrationDto {
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
}