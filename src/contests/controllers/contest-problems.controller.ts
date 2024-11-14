import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from "@nestjs/common";
import { ContestProblemsService } from "../services/contest-problems.service";
import { commonResponse } from "src/utils/common-response";
import { CreateContestProblemDto } from "../dtos/create-contest-problem.dto";
import { GetContestProblemsDto } from "../dtos/get-contest-problems.dto";
import { UpdateContestProblemDto } from "../dtos/update-contest-problem.dto";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { JwtGuard } from "src/users/guards/jwt.guard";

@ApiTags('Contest Problems')
@Controller('contest-problems')
@ApiBearerAuth()
export class ContestProblemsController {
    constructor(
        private readonly contestProblemsService: ContestProblemsService,
    ) { }

    @Get()
    async getAllContestProblems(@Query() getContestProblemsDto: GetContestProblemsDto) {
        try {
            const data = await this.contestProblemsService.getContestProblems(getContestProblemsDto);
            return commonResponse(true, 'Get all contest problems successfully', data);
        } catch (error) {
            return commonResponse(false, 'Get all contest problems failed', error);
        }
    }

    @Post()
    @UseGuards(JwtGuard)
    async createContestProblem(@Body() createContestProblemDto: CreateContestProblemDto) {
        try {
            const data = await this.contestProblemsService.createContestProblem(createContestProblemDto);
            return commonResponse(true, 'Create contest problem successfully', data);
        } catch (error) {
            return commonResponse(false, 'Create contest problem failed', error);
        }
    }

    @Get(':id')
    async getContestProblem(@Param('id') contestProblemId: string) {
        try {
            const data = await this.contestProblemsService.getContestProblem(contestProblemId);
            return commonResponse(true, 'Get contest problem successfully', data);
        } catch (error) {
            return commonResponse(false, 'Get contest problem failed', error);
        }
    }

    @Patch(':id')
    @UseGuards(JwtGuard)
    async updateContestProblem(@Param('id') contestProblemId: string, @Body() updateContestProblemDto: UpdateContestProblemDto) {
        try {
            const data = await this.contestProblemsService.updateContestProblem(contestProblemId, updateContestProblemDto);
            return commonResponse(true, 'Update contest problem successfully', data);
        } catch (error) {
            return commonResponse(false, 'Update contest problem failed', error);
        }
    }

    @Delete(':id')
    @UseGuards(JwtGuard)
    async deleteContestProblem(@Param('id') contestProblemId: string) {
        try {
            const data = await this.contestProblemsService.deleteContestProblem(contestProblemId);
            return commonResponse(true, 'Delete contest problem successfully', data);
        } catch (error) {
            return commonResponse(false, 'Delete contest problem failed', error);
        }
    }
}