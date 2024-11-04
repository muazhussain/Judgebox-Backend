import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersEntity } from './entities/users.entity';
import { UsersService } from './services/users.service';
import { AuthController } from './controllers/auth.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UsersEntity,
    ]),
  ],
  providers: [UsersService],
  controllers: [
    AuthController,
  ]
})
export class UsersModule { }
