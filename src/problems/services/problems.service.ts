import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { ProblemsEntity } from '../entities/problems.entity';
import { CreateProblemDto } from '../dtos/create-problem.dto';
import { GetProblemsDto } from '../dtos/get-problems.dto';
import { UpdateProblemDto } from '../dtos/update-problem.dto';

@Injectable()
export class ProblemsService {
    constructor(
        @InjectRepository(ProblemsEntity) private readonly problemsRepository: Repository<ProblemsEntity>,
        private dataSource: DataSource,
    ) { }

    async createProblem(createProblemDto: CreateProblemDto) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const problem = await queryRunner.manager.save(this.problemsRepository.metadata.target, createProblemDto);
            await queryRunner.commitTransaction();
            return problem;
        } catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        } finally {
            await queryRunner.release();
        }
    }

    async getProblem(problemId: string) {
        try {
            const findProblem = await this.problemsRepository.findOne({
                where: {
                    id: problemId,
                },
            });
            if (!findProblem) {
                throw new NotFoundException('Problem not found');
            }
            return findProblem;
        } catch (error) {
            throw error;
        }
    }

    async getProblems(getProblemsDto: GetProblemsDto) {
        try {
            const problems = await this.problemsRepository.find({
                order: {
                    createdAt: 'DESC',
                },
                where: {
                    createdBy: {
                        id: getProblemsDto.createdBy,
                    },
                },
                take: getProblemsDto.limit,
                skip: (getProblemsDto.page - 1) * getProblemsDto.limit,
                relations: ['createdBy'],
            });
            return problems;
        } catch (error) {
            throw error;
        }
    }

    async updateProblem(problemId: string, updateProblemDto: UpdateProblemDto) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const findProblem = await this.problemsRepository.findOne({
                where: {
                    id: problemId,
                },
            });
            if (!findProblem) {
                throw new NotFoundException('Problem not found');
            }
            Object.assign(findProblem, updateProblemDto);
            await queryRunner.manager.update(this.problemsRepository.metadata.target, { id: problemId }, findProblem);
            await queryRunner.commitTransaction();
            return findProblem;
        } catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        } finally {
            await queryRunner.release();
        }
    }

    async deleteProblem(problemId: string) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const findProblem = await this.problemsRepository.findOne({
                where: {
                    id: problemId,
                },
            });
            if (!findProblem) {
                throw new NotFoundException('Problem not found');
            }
            await queryRunner.manager.softDelete(this.problemsRepository.metadata.target, { id: problemId });
            await queryRunner.commitTransaction();
        } catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        } finally {
            await queryRunner.release();
        }
    }
}
