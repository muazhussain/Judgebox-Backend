import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import { ContestRegistrationsService } from "../services/contest-registrations.service";
import { CreateContestRegistrationDto } from "../dtos/create-contest-registration.dto";
import { commonResponse } from "src/utils/common-response";
import { GetContestRegistrationsDto } from "../dtos/get-contest-registrations.dto";
import { ApiTags } from "@nestjs/swagger";

@ApiTags('Contest Registrations')
@Controller('contest-registrations')
export class ContestRegistrationsController {
    constructor(
        private readonly contestRegistrationsService: ContestRegistrationsService,
    ) { }

    @Post('register')
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

    @Get()
    async getAllContestRegistrations(@Query() getContestRegistrationsDto: GetContestRegistrationsDto) {
        try {
            const data = await this.contestRegistrationsService.getContestRegistrations(getContestRegistrationsDto);
            return commonResponse(true, 'Get all contest registrations successfully', data);
        } catch (error) {
            return commonResponse(false, 'Get all contest registrations failed', error);
        }
    }

    @Delete(':id')
    async deleteContestRegistration(@Param('id') contestRegistrationId: string) {
        try {
            const data = await this.contestRegistrationsService.deleteContestRegistration(contestRegistrationId);
            return commonResponse(true, 'Delete contest registration successfully', data);
        } catch (error) {
            return commonResponse(false, 'Delete contest registration failed', error);
        }
    }
}