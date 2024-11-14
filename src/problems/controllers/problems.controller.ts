import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Query,
    UseGuards
} from '@nestjs/common';
import { ProblemsService } from '../services/problems.service';
import { commonResponse } from 'src/utils/common-response';
import { CreateProblemDto } from '../dtos/create-problem.dto';
import { GetProblemsDto } from '../dtos/get-problems.dto';
import { UpdateProblemDto } from '../dtos/update-problem.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RolesGuard } from 'src/users/guards/roles.guard';
import { JwtGuard } from 'src/users/guards/jwt.guard';
import { Roles } from 'src/users/decorators/roles.decorator';
import { UserRoles } from 'src/users/enums/user-role.enum';

@ApiTags('Problems')
@Controller('problems')
@ApiBearerAuth()
export class ProblemsController {
    constructor(
        private readonly problemsService: ProblemsService,
    ) { }

    @Get()
    async getProblems(@Query() getProblemsDto: GetProblemsDto) {
        try {
            const data = await this.problemsService.getProblems(getProblemsDto);
            return commonResponse(true, 'Get problems successfully', data);
        } catch (error) {
            return commonResponse(false, 'Get problems failed', error);
        }
    }

    @Post()
    @UseGuards(RolesGuard, JwtGuard)
    @Roles(UserRoles.ADMIN)
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

    @Patch(':id')
    @UseGuards(RolesGuard, JwtGuard)
    @Roles(UserRoles.ADMIN)
    async updateProblem(@Param('id') problemId: string, @Body() updateProblemDto: UpdateProblemDto) {
        try {
            const data = await this.problemsService.updateProblem(problemId, updateProblemDto);
            return commonResponse(true, 'Update problem successfully', data);
        } catch (error) {
            return commonResponse(false, 'Update problem failed', error);
        }
    }

    @Delete(':id')
    @UseGuards(RolesGuard, JwtGuard)
    @Roles(UserRoles.ADMIN)
    async deleteProblem(@Param('id') problemId: string) {
        try {
            const data = await this.problemsService.deleteProblem(problemId);
            return commonResponse(true, 'Delete problem successfully', data);
        } catch (error) {
            return commonResponse(false, 'Delete problem failed', error);
        }
    }
}
