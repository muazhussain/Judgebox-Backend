import { InjectQueue } from "@nestjs/bull";
import {
    Injectable,
    NotFoundException
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Queue } from "bull";
import {
    DataSource,
    Repository
} from "typeorm";
import { CreateSubmissionDto } from "../dtos/create-submission.dto";
import { SubmissionStatus } from "../enums/submission-status.enum";
import { SubmissionGateway } from "../gateways/websocket.gateway";
import { SubmissionsEntity } from "../entities/submissions.entity";
import { GetSubmissionsDto } from "../dtos/get-submissions.dto";

@Injectable()
export class SubmissionsService {
    constructor(
        @InjectRepository(SubmissionsEntity) private readonly submissionsRepository: Repository<SubmissionsEntity>,
        @InjectQueue('judge-queue') private judgeQueue: Queue,
        private readonly websocketGateway: SubmissionGateway,
        private dataSource: DataSource,
    ) { }

    async createSubmission(createSubmissionDto: CreateSubmissionDto) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const submission = this.submissionsRepository.create({
                language: createSubmissionDto.language,
                sourceCode: createSubmissionDto.sourceCode,
                problem: createSubmissionDto.problem as any,
                participant: createSubmissionDto.participant as any,
                contest: createSubmissionDto.contest as any,
            });
            await queryRunner.manager.save(this.submissionsRepository.metadata.target, submission);
            await this.judgeQueue.add('judge-submission', {
                submissionId: submission.id,
                problemId: createSubmissionDto.problem,
                language: createSubmissionDto.language,
                sourceCode: createSubmissionDto.sourceCode
            });
            await queryRunner.commitTransaction();
            return submission;
        } catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        } finally {
            await queryRunner.release();
        }
    }

    async getSubmission(submissionId: string) {
        try {
            const findSubmission = await this.submissionsRepository.findOne({
                where: {
                    id: submissionId,
                },
                relations: ['problem', 'participant', 'contest'],
            });
            if (!findSubmission) {
                throw new NotFoundException('Submission not found');
            }
            return findSubmission;
        } catch (error) {
            throw error;
        }
    }

    async getSubmissions(getSubmissionDto: GetSubmissionsDto) {
        try {
            const limit = getSubmissionDto?.limit || 10;
            const page = getSubmissionDto?.page || 1;
            return await this.submissionsRepository.find({
                where: {
                    problem: {
                        id: getSubmissionDto.problem,
                    },
                    participant: {
                        id: getSubmissionDto.participant,
                    },
                    contest: {
                        id: getSubmissionDto.contest,
                    }
                },
                take: limit,
                skip: (page - 1) * limit,
                order: {
                    createdAt: 'DESC',
                },
                relations: ['problem', 'participant', 'contest'],
            });
        } catch (error) {
            throw error;
        }
    }

    async updateSubmissionStatus(submissionId: string, status: SubmissionStatus, data: any) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const findSubmission = await this.submissionsRepository.findOne({
                where: {
                    id: submissionId
                }
            });
            if (!findSubmission) {
                throw new NotFoundException('Submission not found');
            }
            findSubmission.status = status;
            await queryRunner.manager.update(this.submissionsRepository.metadata.target, { id: submissionId }, findSubmission);

            // Notify clients about status change
            this.websocketGateway.notifySubmissionUpdate(submissionId, status, data);
            await queryRunner.commitTransaction();
        } catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        } finally {
            await queryRunner.release();
        }
    }
}