import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from "@nestjs/common";
import { ContestsService } from "../services/contests.service";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { CreateContestDto } from "../dtos/create-contest.dto";
import { commonResponse } from "src/utils/common-response";
import { GetContestsDto } from "../dtos/get-contests.dto";
import { UpdateContestDto } from "../dtos/update-contest.dto";
import { JwtGuard } from "src/users/guards/jwt.guard";
import { RolesGuard } from "src/users/guards/roles.guard";
import { Roles } from "src/users/decorators/roles.decorator";
import { UserRoles } from "src/users/enums/user-role.enum";

@ApiTags('Contests')
@Controller('contests')
@ApiBearerAuth()
export class ContestsController {
    constructor(
        private readonly contestsService: ContestsService,
    ) { }

    @Get()
    async getContests(@Query() getContestsDto: GetContestsDto) {
        try {
            const data = await this.contestsService.getContests(getContestsDto);
            return commonResponse(true, 'Get contests successfully', data);
        } catch (error) {
            return commonResponse(false, 'Get contests failed', error);
        }
    }

    @Post()
    @UseGuards(RolesGuard, JwtGuard)
    @Roles(UserRoles.ADMIN)
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

    @Patch(':id')
    @UseGuards(RolesGuard, JwtGuard)
    @Roles(UserRoles.ADMIN)
    async updateContest(@Param('id') contestId: string, @Body() updateContestDto: UpdateContestDto) {
        try {
            const data = await this.contestsService.updateContest(contestId, updateContestDto);
            return commonResponse(true, 'Update contest successfully', data);
        } catch (error) {
            return commonResponse(false, 'Update contest failed', error);
        }
    }

    @Delete(':id')
    @UseGuards(RolesGuard, JwtGuard)
    @Roles(UserRoles.ADMIN)
    async deleteContest(@Param('id') contestId: string) {
        try {
            const data = await this.contestsService.deleteContest(contestId);
            return commonResponse(true, 'Delete contest successfully', data);
        } catch (error) {
            return commonResponse(false, 'Delete contest failed', error);
        }
    }
}