import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import { ContestsRegistrationsService } from "../services/contests-registrations.service";
import { CreateContestRegistrationDto } from "../dtos/create-contest-registration.dto";
import { commonResponse } from "src/utils/common-response";
import { get } from "http";
import { GetContestRegistrationsDto } from "../dtos/get-contest-registrations.dto";

@Controller('contest-registrations')
export class ContestsRegistrationsController {
    constructor(
        private readonly contestsRegistrationsService: ContestsRegistrationsService,
    ) { }

    @Post('register')
    async createContestRegistration(@Body() createContestRegistrationDto: CreateContestRegistrationDto) {
        try {
            const data = await this.contestsRegistrationsService.createContestRegistration(createContestRegistrationDto);
            return commonResponse(true, 'Create contest registration successfully', data);
        } catch (error) {
            return commonResponse(false, 'Create contest registration failed', error);
        }
    }

    @Get(':id')
    async getContestRegistration(@Param('id') contestRegistrationId: string) {
        try {
            const data = await this.contestsRegistrationsService.getContestRegistration(contestRegistrationId);
            return commonResponse(true, 'Get contest registration successfully', data);
        } catch (error) {
            return commonResponse(false, 'Get contest registration failed', error);
        }
    }

    @Get()
    async getAllContestRegistrations(@Query() getContestRegistrationsDto: GetContestRegistrationsDto) {
        try {
            const data = await this.contestsRegistrationsService.getContestRegistrations(getContestRegistrationsDto);
            return commonResponse(true, 'Get all contest registrations successfully', data);
        } catch (error) {
            return commonResponse(false, 'Get all contest registrations failed', error);
        }
    }

    @Delete(':id')
    async deleteContestRegistration(@Param('id') contestRegistrationId: string) {
        try {
            const data = await this.contestsRegistrationsService.deleteContestRegistration(contestRegistrationId);
            return commonResponse(true, 'Delete contest registration successfully', data);
        } catch (error) {
            return commonResponse(false, 'Delete contest registration failed', error);
        }
    }
}