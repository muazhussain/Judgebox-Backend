import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, Min, Max, IsOptional } from "class-validator";

export class GetUsersDto {
    @ApiProperty({
        required: false,
        type: 'number',
        minimum: 0,
        maximum: 50,
        example: 10,
        default: 10,
        description: 'The number of users to return',
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
}