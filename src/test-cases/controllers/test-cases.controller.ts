import { 
    Body, 
    Controller, 
    Delete, 
    Get, 
    Param, 
    Patch, 
    Post, 
    Query
} from "@nestjs/common";
import { TestCasesService } from "../services/test-cases.service";
import { CreateTestCaseDto } from "../dtos/create-test-case.dto";
import { commonResponse } from "src/utils/common-response";
import { UpdateTestCaseDto } from "../dtos/update-test-case.dto";

@Controller('test-cases')
export class TestCasesController {
    constructor(
        private readonly testCasesService: TestCasesService,
    ) {}

    @Post()
    async createTestCases(@Body() createTestCaseDto: CreateTestCaseDto) {
        try {
            const data = await this.testCasesService.create(createTestCaseDto);
            return commonResponse(true, 'Create test cases successfully', data);
        } catch (error) {
            return commonResponse(false, 'Create test cases failed', error);
        }
    }

    @Get()
    async findAll(@Query('problemId') problemId?: string) {
        try {
            const data = await this.testCasesService.findByProblemId(problemId);
            return commonResponse(true, 'Get test cases successfully', data);
        } catch (error) {
            return commonResponse(false, 'Get test cases failed', error);
        }
    }

    @Delete('problem/:problemId')
    async deleteByProblemId(@Param('problemId') problemId: string) {
        try {
            const data = await this.testCasesService.deleteByProblemId(problemId);
            return commonResponse(true, 'Delete test cases successfully', data);
        } catch (error) {
            return commonResponse(false, 'Delete test cases failed', error);
        }
    }

    @Post('reorder/:problemId')
    async reorderTestCases(@Param('problemId') problemId: string) {
        try {
            const data = await this.testCasesService.reorderTestCases(problemId);
            return commonResponse(true, 'Reorder test cases successfully', data);
        } catch (error) {
            return commonResponse(false, 'Reorder test cases failed', error);
        }
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        try {
            const data = await this.testCasesService.findOne(id);
            return commonResponse(true, 'Get test case successfully', data);
        } catch (error) {
            return commonResponse(false, 'Get test case failed', error);
        }
    }

    @Patch(':id')
    async update(@Param('id') id: string, @Body() updateTestCaseDto: UpdateTestCaseDto ) {
        try {
            const data = await this.testCasesService.update(id, updateTestCaseDto);
            return commonResponse(true, 'Update test case successfully', data);
        } catch (error) {
            return commonResponse(false, 'Update test case failed', error);
        }
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        try {
            const data = await this.testCasesService.delete(id);
            return commonResponse(true, 'Delete test case successfully', data);
        } catch (error) {
            return commonResponse(false, 'Delete test case failed', error);
        }
    }
}