import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { SubmissionsService } from '../services/submissions.service';
import { GetSubmissionsDto } from '../dtos/get-submissions.dto';
import { commonResponse } from 'src/utils/common-response';
import { CreateSubmissionDto } from '../dtos/create-submission.dto';
import { SubmissionStatus } from '../enums/submission-status.enum';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Submissions')
@Controller('submissions')
export class SubmissionsController {
    constructor(
        private readonly submissionsService: SubmissionsService,
    ) { }

    @Get()
    async getSubmissions(@Query() getSubmissionsDto: GetSubmissionsDto) {
        try {
            const data = await this.submissionsService.getSubmissions(getSubmissionsDto);
            return commonResponse(true, 'Get submissions successfully', data);
        } catch (error) {
            return commonResponse(false, 'Get submissions failed', error);
        }
    }

    @Post()
    async createSubmission(@Body() createSubmissionDto: CreateSubmissionDto) {
        try {
            const data = await this.submissionsService.createSubmission(createSubmissionDto);
            return commonResponse(true, 'Create submission successfully', data);
        } catch (error) {
            return commonResponse(false, 'Create submission failed', error);
        }
    }

    @Get(':id')
    async getSubmission(@Param('id') submissionId: string) {
        try {
            const data = await this.submissionsService.getSubmission(submissionId);
            return commonResponse(true, 'Get submission successfully', data);
        } catch (error) {
            return commonResponse(false, 'Get submission failed', error);
        }
    }

    @Patch(':id')
    async updateSubmission(@Param('id') submissionId: string, @Body() { status, data }: { status: SubmissionStatus, data: any }) {
        try {
            const output = await this.submissionsService.updateSubmissionStatus(submissionId, status, data);
            return commonResponse(true, 'Update submission successfully', output);
        } catch (error) {
            return commonResponse(false, 'Update submission failed', error);
        }
    }
}
