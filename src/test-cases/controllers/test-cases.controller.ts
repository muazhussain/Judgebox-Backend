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
} from "@nestjs/common";
import { TestCasesService } from "../services/test-cases.service";
import { CreateTestCaseDto } from "../dtos/create-test-case.dto";
import { commonResponse } from "src/utils/common-response";
import { UpdateTestCaseDto } from "../dtos/update-test-case.dto";
import {
    ApiBearerAuth,
    ApiTags
} from "@nestjs/swagger";
import { RolesGuard } from "src/users/guards/roles.guard";
import { JwtGuard } from "src/users/guards/jwt.guard";
import { Roles } from "src/users/decorators/roles.decorator";
import { UserRoles } from "src/users/enums/user-role.enum";

@ApiTags('Test Cases')
@Controller('test-cases')
@ApiBearerAuth()
export class TestCasesController {
    constructor(
        private readonly testCasesService: TestCasesService,
    ) { }

    @Post()
    @UseGuards(RolesGuard, JwtGuard)
    @Roles(UserRoles.ADMIN)
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
    @UseGuards(RolesGuard, JwtGuard)
    @Roles(UserRoles.ADMIN)
    async deleteByProblemId(@Param('problemId') problemId: string) {
        try {
            const data = await this.testCasesService.deleteByProblemId(problemId);
            return commonResponse(true, 'Delete test cases successfully', data);
        } catch (error) {
            return commonResponse(false, 'Delete test cases failed', error);
        }
    }

    @Post('reorder/:problemId')
    @UseGuards(RolesGuard, JwtGuard)
    @Roles(UserRoles.ADMIN)
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
    @UseGuards(RolesGuard, JwtGuard)
    @Roles(UserRoles.ADMIN)
    async update(@Param('id') id: string, @Body() updateTestCaseDto: UpdateTestCaseDto) {
        try {
            const data = await this.testCasesService.update(id, updateTestCaseDto);
            return commonResponse(true, 'Update test case successfully', data);
        } catch (error) {
            return commonResponse(false, 'Update test case failed', error);
        }
    }

    @Delete(':id')
    @UseGuards(RolesGuard, JwtGuard)
    @Roles(UserRoles.ADMIN)
    async remove(@Param('id') id: string) {
        try {
            const data = await this.testCasesService.delete(id);
            return commonResponse(true, 'Delete test case successfully', data);
        } catch (error) {
            return commonResponse(false, 'Delete test case failed', error);
        }
    }
}