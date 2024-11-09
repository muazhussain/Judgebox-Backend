import {
    Injectable,
    NotFoundException
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ContestProblemsEntity } from "../entities/contest-problems.entity";
import {
    Repository,
    DataSource
} from "typeorm";
import { CreateContestProblemDto } from "../dtos/create-contest-problem.dto";
import { GetContestProblemsDto } from "../dtos/get-contest-problems.dto";
import { UpdateContestProblemDto } from "../dtos/update-contest-problem.dto";

@Injectable()
export class ContestProblemsService {
    constructor(
        @InjectRepository(ContestProblemsEntity) private readonly contestProblemsRepository: Repository<ContestProblemsEntity>,
        private dataSource: DataSource,
    ) { }

    async createContestProblem(createContestProblemDto: CreateContestProblemDto) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const contestProblem = await queryRunner.manager.save(this.contestProblemsRepository.metadata.target, createContestProblemDto);
            await queryRunner.commitTransaction();
            await queryRunner.release();
            return contestProblem;
        } catch (error) {
            throw error;
        }
    }

    async getContestProblem(contestProblemId: string) {
        try {
            const findContestProblem = await this.contestProblemsRepository.findOne({
                where: {
                    id: contestProblemId,
                },
            });
            if (!findContestProblem) {
                throw new NotFoundException('Contest problem not found');
            }
            return findContestProblem;
        } catch (error) {
            throw error;
        }
    }

    async getContestProblems(getContestProblemsDto: GetContestProblemsDto): Promise<ContestProblemsEntity[]> {
        try {
            return await this.contestProblemsRepository.find({
                take: getContestProblemsDto?.limit || 10,
                skip: (getContestProblemsDto?.page || 1 - 1) * getContestProblemsDto?.limit || 10,
                order: {
                    problemOrder: 'ASC',
                    createdAt: 'DESC',
                },
                where: {
                    contest: {
                        id: getContestProblemsDto?.contest,
                    },
                },
            })
        } catch (error) {
            throw error;
        }
    }

    async updateContestProblem(contestProblemId: string, updateContestProblemDto: UpdateContestProblemDto) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const findContestProblem = await this.contestProblemsRepository.findOne({
                where: {
                    id: contestProblemId,
                },
            });
            if (!findContestProblem) {
                throw new NotFoundException('Contest problem not found');
            }
            Object.assign(findContestProblem, updateContestProblemDto);
            const contestProblem = await queryRunner.manager.update(this.contestProblemsRepository.metadata.target, { id: contestProblemId }, findContestProblem);
            await queryRunner.commitTransaction();
            await queryRunner.release();
            return contestProblem;
        } catch (error) {
            throw error;
        }
    }

    async deleteContestProblem(contestProblemId: string) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const findContestProblem = await this.contestProblemsRepository.findOne({
                where: {
                    id: contestProblemId,
                },
            });
            if (!findContestProblem) {
                throw new NotFoundException('Contest problem not found');
            }
            const contestProblem = await queryRunner.manager.softDelete(this.contestProblemsRepository.metadata.target, { id: contestProblemId });
            await queryRunner.commitTransaction();
            await queryRunner.release();
            return contestProblem;
        } catch (error) {
            throw error;
        }
    }
}