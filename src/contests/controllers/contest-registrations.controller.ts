import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from "@nestjs/common";
import { ContestRegistrationsService } from "../services/contest-registrations.service";
import { CreateContestRegistrationDto } from "../dtos/create-contest-registration.dto";
import { commonResponse } from "src/utils/common-response";
import { GetContestRegistrationsDto } from "../dtos/get-contest-registrations.dto";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { JwtGuard } from "src/users/guards/jwt.guard";

@ApiTags('Contest Registrations')
@Controller('contest-registrations')
@ApiBearerAuth()
export class ContestRegistrationsController {
    constructor(
        private readonly contestRegistrationsService: ContestRegistrationsService,
    ) { }

    @Get()
    async getAllContestRegistrations(@Query() getContestRegistrationsDto: GetContestRegistrationsDto) {
        try {
            const data = await this.contestRegistrationsService.getContestRegistrations(getContestRegistrationsDto);
            return commonResponse(true, 'Get all contest registrations successfully', data);
        } catch (error) {
            return commonResponse(false, 'Get all contest registrations failed', error);
        }
    }

    @Post()
    @UseGuards(JwtGuard)
    async createContestRegistration(@Body() createContestRegistrationDto: CreateContestRegistrationDto) {
        try {
            const data = await this.contestRegistrationsService.createContestRegistration(createContestRegistrationDto);
            return commonResponse(true, 'Create contest registration successfully', data);
        } catch (error) {
            return commonResponse(false, 'Create contest registration failed', error);
        }
    }

    @Get(':id')
    async getContestRegistration(@Param('id') contestRegistrationId: string) {
        try {
            const data = await this.contestRegistrationsService.getContestRegistration(contestRegistrationId);
            return commonResponse(true, 'Get contest registration successfully', data);
        } catch (error) {
            return commonResponse(false, 'Get contest registration failed', error);
        }
    }

    @Delete(':id')
    @UseGuards(JwtGuard)
    async deleteContestRegistration(@Param('id') contestRegistrationId: string) {
        try {
            const data = await this.contestRegistrationsService.deleteContestRegistration(contestRegistrationId);
            return commonResponse(true, 'Delete contest registration successfully', data);
        } catch (error) {
            return commonResponse(false, 'Delete contest registration failed', error);
        }
    }
}