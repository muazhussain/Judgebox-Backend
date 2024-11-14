import {
    Injectable,
    NotFoundException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ContestRegistrationsEntity } from '../entities/contest-registrations.entity';
import {
    DataSource,
    Repository
} from 'typeorm';
import { GetContestRegistrationsDto } from '../dtos/get-contest-registrations.dto';
import { CreateContestRegistrationDto } from '../dtos/create-contest-registration.dto';

@Injectable()
export class ContestRegistrationsService {
    constructor(
        @InjectRepository(ContestRegistrationsEntity) private readonly contestsRegistrationsRepository: Repository<ContestRegistrationsEntity>,
        private dataSource: DataSource,
    ) { }

    async createContestRegistration(createContestRegistrationDto: CreateContestRegistrationDto) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const contestRegistration = await queryRunner.manager.save(this.contestsRegistrationsRepository.metadata.target, createContestRegistrationDto);
            await queryRunner.commitTransaction();
            return contestRegistration;
        } catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        } finally {
            await queryRunner.release();
        }
    }

    async getContestRegistration(contestRegistrationId: string): Promise<ContestRegistrationsEntity> {
        try {
            const findContestRegistration = await this.contestsRegistrationsRepository.findOne({
                where: {
                    id: contestRegistrationId,
                },
                relations: {
                    participant: true,
                    contest: true,
                },
            });
            if (!findContestRegistration) {
                throw new NotFoundException('Contest registration not found');
            }
            return findContestRegistration;
        } catch (error) {
            throw error;
        }
    }

    async getContestRegistrations(getContestRegistrationsDto: GetContestRegistrationsDto): Promise<ContestRegistrationsEntity[]> {
        try {
            const limit = getContestRegistrationsDto?.limit || 10;
            const page = getContestRegistrationsDto?.page || 1;
            return await this.contestsRegistrationsRepository.find({
                order: {
                    createdAt: 'DESC',
                },
                take: limit,
                skip: (page - 1) * limit,
                where: {
                    contest: {
                        id: getContestRegistrationsDto?.contest,
                    },
                    participant: {
                        id: getContestRegistrationsDto?.participant,
                    },
                },
                relations: {
                    participant: true,
                    contest: true,
                },
            });
        } catch (error) {
            throw error;
        }
    }

    async deleteContestRegistration(contestRegistrationId: string) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const findContestRegistration = await this.contestsRegistrationsRepository.findOne({
                where: {
                    id: contestRegistrationId,
                },
            });
            if (!findContestRegistration) {
                throw new NotFoundException('Contest registration not found');
            }
            await queryRunner.manager.softDelete(this.contestsRegistrationsRepository.metadata.target, findContestRegistration);
            await queryRunner.commitTransaction();
        } catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        } finally {
            await queryRunner.release();
        }
    }
}
