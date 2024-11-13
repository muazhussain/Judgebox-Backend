import { 
    Injectable, 
    NotFoundException 
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { 
    TestCase, 
    TestCaseDocument 
} from "../schemas/test-cases.schema";
import { Model } from "mongoose";
import { CreateTestCaseDto } from "../dtos/create-test-case.dto";
import { UpdateTestCaseDto } from "../dtos/update-test-case.dto";

@Injectable()
export class TestCasesService {
    constructor(
        @InjectModel(TestCase.name) private testCaseModel: Model<TestCaseDocument>
    ) {}

    async create(createTestCaseDto: CreateTestCaseDto): Promise<TestCase> {
        try {
            const createdTestCase = new this.testCaseModel(createTestCaseDto);
            return await createdTestCase.save();
        } catch (error) {
            throw error;
        }
    }

    async findAll(): Promise<TestCase[]> {
        try {
            return this.testCaseModel.find().sort({ order: 1 }).exec();
        } catch (error) {
            throw error;
        }
    }

    async findByProblemId(problemId: string): Promise<TestCase[]> {
        try {
            return this.testCaseModel
            .find({ problemId })
            .sort({ order: 1 })
            .exec();
        } catch (error) {
            throw error;
        }
    }

    async findOne(id: string): Promise<TestCase> {
        try {
            const testCase = await this.testCaseModel.findById(id).exec();
        if (!testCase) {
            throw new NotFoundException(`Test case with ID ${id} not found`);
        }
        return testCase;
        } catch (error) {
            throw error;
        }
    }

    async update(id: string, updateTestCaseDto: UpdateTestCaseDto): Promise<TestCase> {
        try {
            const updatedTestCase = await this.testCaseModel
            .findByIdAndUpdate(id, updateTestCaseDto, { new: true })
            .exec();
        if (!updatedTestCase) {
            throw new NotFoundException(`Test case with ID ${id} not found`);
        }
        return updatedTestCase;
        } catch (error) {
            throw error;
        }
    }

    async delete(id: string): Promise<void> {
        const result = await this.testCaseModel.findByIdAndDelete(id).exec();
        if (!result) {
            throw new NotFoundException(`Test case with ID ${id} not found`);
        }
    }

    async deleteByProblemId(problemId: string): Promise<void> {
        try {
            await this.testCaseModel.deleteMany({ problemId }).exec();
        } catch (error) {
            throw error;
        }
    }

     async reorderTestCases(problemId: string): Promise<void> {
        const testCases = await this.testCaseModel
            .find({ problemId })
            .sort({ order: 1 })
            .exec();
        
        const updateOperations = testCases.map((testCase, index) => ({
            updateOne: {
                filter: { _id: testCase._id },
                update: { $set: { order: index } }
            }
        }));

        if (updateOperations.length > 0) {
            await this.testCaseModel.bulkWrite(updateOperations);
        }
    }
}