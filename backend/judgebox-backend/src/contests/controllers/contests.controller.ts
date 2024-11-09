import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import { ContestsService } from "../services/contests.service";
import { ApiTags } from "@nestjs/swagger";
import { CreateContestDto } from "../dtos/create-contest.dto";
import { commonResponse } from "src/utils/common-response";
import { GetContestsDto } from "../dtos/get-contests.dto";
import { UpdateContestDto } from "../dtos/update-contest.dto";

@ApiTags('Contests')
@Controller('contests')
export class ContestsController {
    constructor(
        private readonly contestsService: ContestsService,
    ) { }

    @Post('create')
    async createContest(@Body() createContestDto: CreateContestDto) {
        try {
            const data = await this.contestsService.createContest(createContestDto);
            return commonResponse(true, 'Create contest successfully', data);
        } catch (error) {
            return commonResponse(false, 'Create contest failed', error);
        }
    }

    @Get(':id')
    async getContest(@Param('id') contestId: string) {
        try {
            const data = await this.contestsService.getContest(contestId);
            return commonResponse(true, 'Get contest successfully', data);
        } catch (error) {
            return commonResponse(false, 'Get contest failed', error);
        }
    }

    async getContests(@Query() getContestsDto: GetContestsDto) {
        try {
            const data = await this.contestsService.getContests(getContestsDto);
            return commonResponse(true, 'Get contests successfully', data);
        } catch (error) {
            return commonResponse(false, 'Get contests failed', error);
        }
    }

    @Patch(':id')
    async updateContest(@Param('id') contestId: string, @Body() updateContestDto: UpdateContestDto) {
        try {
            const data = await this.contestsService.updateContest(contestId, updateContestDto);
            return commonResponse(true, 'Update contest successfully', data);
        } catch (error) {
            return commonResponse(false, 'Update contest failed', error);
        }
    }

    @Delete(':id')
    async deleteContest(@Param('id') contestId: string) {
        try {
            const data = await this.contestsService.deleteContest(contestId);
            return commonResponse(true, 'Delete contest successfully', data);
        } catch (error) {
            return commonResponse(false, 'Delete contest failed', error);
        }
    }
}