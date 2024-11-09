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
export class ContestsRegistrationsService {
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
            await queryRunner.release();
            return contestRegistration;
        } catch (error) {
            throw error;
        }
    }

    async getContestRegistration(contestRegistrationId: string): Promise<ContestRegistrationsEntity> {
        try {
            const findContestRegistration = await this.contestsRegistrationsRepository.findOne({
                select: ['id', 'participant', 'contest'],
                where: {
                    id: contestRegistrationId,
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
            return await this.contestsRegistrationsRepository.find({
                select: ['id', 'participant', 'contest'],
                take: getContestRegistrationsDto?.limit || 10,
                skip: (getContestRegistrationsDto?.page || 1 - 1) * getContestRegistrationsDto?.limit || 10,
                order: {
                    createdAt: 'DESC',
                },
                where: {
                    contest: {
                        id: getContestRegistrationsDto?.contest,
                    },
                    participant: {
                        id: getContestRegistrationsDto?.participant,
                    },
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
            await queryRunner.release();
        } catch (error) {
            throw error;
        }
    }
}
