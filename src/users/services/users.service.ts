import {
    ConflictException,
    Injectable,
    NotFoundException,
    UnauthorizedException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from '../entities/users.entity';
import {
    DataSource,
    Repository
} from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from '../dtos/register.dto';
import { UserRoles } from '../enums/user-role.enum';
import * as bcrypt from 'bcrypt';
import { LoginDto } from '../dtos/login.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { ENV } from 'src/env';
import { GetUsersDto } from '../dtos/get-users.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UsersEntity) private readonly usersRepository: Repository<UsersEntity>,
        private readonly jwtService: JwtService,
        private dataSource: DataSource,
    ) { }

    async register(registerDto: RegisterDto) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const existingUser = await this.usersRepository.findOne({
                where: {
                    email: registerDto.email,
                },
            });
            if (existingUser) {
                throw new ConflictException('Email already exists');
            }
            const salt = await bcrypt.genSalt(ENV.security.bcryptSaltRounds);
            const hashedPassword = await bcrypt.hash(registerDto.password, salt);
            const user = await queryRunner.manager.save(this.usersRepository.metadata.target, {
                ...registerDto,
                password: hashedPassword,
                role: UserRoles.USER,
            });
            await queryRunner.commitTransaction();
        } catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        } finally {
            await queryRunner.release();
        }
    }

    async login(loginDto: LoginDto): Promise<{ accessToken: string; refreshToken: string; csrfToken: string }> {
        try {
            const user = await this.usersRepository.findOne({
                where: {
                    email: loginDto.email,
                },
            });
            if (!user || !await bcrypt.compare(loginDto.password, user.password)) {
                throw new UnauthorizedException('Invalid credentials');
            }
            const payload = { email: user.email };
            const accessToken = this.jwtService.sign({ ...payload, tokenType: 'access' }, { expiresIn: '1h' });
            const refreshToken = this.jwtService.sign({ ...payload, tokenType: 'refresh' }, { expiresIn: loginDto?.rememberMe ? '7d' : '1d' });
            const csrfToken = await bcrypt.genSalt();
            return { accessToken, refreshToken, csrfToken };
        } catch (error) {
            throw error;
        }
    }

    async getUser(request: any): Promise<UsersEntity> {
        try {
            const findUser = await this.usersRepository.findOne({
                where: {
                    id: request.user.id,
                },
                select: ['id', 'name', 'email', 'role', 'createdAt'],
            });
            if (!findUser) {
                throw new NotFoundException('User not found');
            }
            return findUser;
        } catch (error) {
            throw error;
        }
    }

    async getUsers(getUsersDto: GetUsersDto): Promise<UsersEntity[]> {
        try {
            const limit = getUsersDto?.limit || 10;
            const page = getUsersDto?.page || 1;
            return await this.usersRepository.find({
                where: {
                    role: UserRoles.USER,
                },
                take: limit,
                skip: (page - 1) * limit,
                select: ['id', 'name', 'email', 'createdAt'],
            });
        } catch (error) {
            throw error;
        }
    }

    async updateUser(request: any, updateUserDto: UpdateUserDto) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const findUser = await this.usersRepository.findOne({
                where: {
                    id: request.user,
                },
            });
            if (!findUser) {
                throw new NotFoundException('User not found');
            }
            Object.assign(findUser, updateUserDto);
            await queryRunner.manager.save(this.usersRepository.metadata.target, findUser);
            await queryRunner.commitTransaction();
        } catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        } finally {
            await queryRunner.release();
        }
    }

    async deleteUser(request: any) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const findUser = await this.usersRepository.findOne({
                where: {
                    id: request.user,
                },
            });
            if (!findUser) {
                throw new NotFoundException('User not found');
            }
            await queryRunner.manager.softDelete(this.usersRepository.metadata.target, findUser);
            await queryRunner.commitTransaction();
        } catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        } finally {
            await queryRunner.release();
        }
    }
}