import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Query
} from '@nestjs/common';
import { ProblemsService } from '../services/problems.service';
import { commonResponse } from 'src/utils/common-response';
import { CreateProblemDto } from '../dtos/create-problem.dto';
import { GetProblemsDto } from '../dtos/get-problems.dto';
import { UpdateProblemDto } from '../dtos/update-problem.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Problems')
@Controller('problems')
export class ProblemsController {
    constructor(
        private readonly problemsService: ProblemsService,
    ) { }

    @Post('create')
    async createProblem(@Body() createProblemDto: CreateProblemDto) {
        try {
            const data = await this.problemsService.createProblem(createProblemDto);
            return commonResponse(true, 'Create problem successfully', data);
        } catch (error) {
            return commonResponse(false, 'Create problem failed', error);
        }
    }

    @Get(':id')
    async getProblem(@Param('id') problemId: string) {
        try {
            const data = await this.problemsService.getProblem(problemId);
            return commonResponse(true, 'Get problem successfully', data);
        } catch (error) {
            return commonResponse(false, 'Get problem failed', error);
        }
    }

    @Get('all')
    async getProblems(@Query() getProblemsDto: GetProblemsDto) {
        try {
            const data = await this.problemsService.getProblems(getProblemsDto);
            return commonResponse(true, 'Get problems successfully', data);
        } catch (error) {
            return commonResponse(false, 'Get problems failed', error);
        }
    }

    @Patch(':id')
    async updateProblem(@Param('id') problemId: string, @Body() updateProblemDto: UpdateProblemDto) {
        try {
            const data = await this.problemsService.updateProblem(problemId, updateProblemDto);
            return commonResponse(true, 'Update problem successfully', data);
        } catch (error) {
            return commonResponse(false, 'Update problem failed', error);
        }
    }

    @Delete(':id')
    async deleteProblem(@Param('id') problemId: string) {
        try {
            const data = await this.problemsService.deleteProblem(problemId);
            return commonResponse(true, 'Delete problem successfully', data);
        } catch (error) {
            return commonResponse(false, 'Delete problem failed', error);
        }
    }
}
