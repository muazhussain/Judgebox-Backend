import {
    Injectable,
    NotFoundException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ContestsEntity } from '../entities/contests.entity';
import {
    DataSource,
    Repository
} from 'typeorm';
import { CreateContestDto } from '../dtos/create-contest.dto';
import { UpdateContestDto } from '../dtos/update-contest.dto';
import { GetContestsDto } from '../dtos/get-contests.dto';

@Injectable()
export class ContestsService {
    constructor(
        @InjectRepository(ContestsEntity) private readonly contestsRepository: Repository<ContestsEntity>,
        private dataSource: DataSource,
    ) { }

    async createContest(createContestDto: CreateContestDto) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const contest = await queryRunner.manager.save(this.contestsRepository.metadata.target, createContestDto);
            await queryRunner.commitTransaction();
            await queryRunner.release();
            return contest;
        } catch (error) {
            throw error;
        }
    }

    async getContest(contestId: string): Promise<ContestsEntity> {
        try {
            const findContest = await this.contestsRepository.findOne({
                where: {
                    id: contestId,
                },
                relations: {
                    createdBy: true,
                },
            });
            if (!findContest) {
                throw new NotFoundException('Contest not found');
            }
            return findContest;
        } catch (error) {
            throw error;
        }
    }

    async getAllContests(getContestsDto: GetContestsDto): Promise<ContestsEntity[]> {
        try {
            return await this.contestsRepository.find({
                where: {
                    createdBy: {
                        id: getContestsDto?.createdBy,
                    },
                },
                select: ['id', 'name', 'description', 'startTime', 'endTime', 'createdAt', 'createdBy'],
                take: getContestsDto?.limit || 10,
                skip: (getContestsDto?.page || 1 - 1) * getContestsDto?.limit || 10,
                order: {
                    createdAt: 'DESC',
                },
            });
        } catch (error) {
            throw error;
        }
    }

    async updateContest(contestId: string, updateContestDto: UpdateContestDto) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const findContest = await this.contestsRepository.findOne({
                where: {
                    id: contestId,
                },
            });
            if (!findContest) {
                throw new NotFoundException('Contest not found');
            }
            Object.assign(findContest, updateContestDto);
            await queryRunner.manager.update(this.contestsRepository.metadata.target, { id: contestId }, findContest);
            await queryRunner.commitTransaction();
            await queryRunner.release();
        } catch (error) {
            throw error;
        }
    }

    async deleteContest(contestId: string) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const findContest = await this.contestsRepository.findOne({
                where: {
                    id: contestId,
                },
            });
            if (!findContest) {
                throw new NotFoundException('Contest not found');
            }
            await queryRunner.manager.softDelete(this.contestsRepository.metadata.target, findContest);
            await queryRunner.commitTransaction();
            await queryRunner.release();
        } catch (error) {
            throw error;
        }
    }
}