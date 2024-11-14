import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersEntity } from './entities/users.entity';
import { UsersService } from './services/users.service';
import { AuthController } from './controllers/auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UsersController } from './controllers/users.controller';
import { ENV } from 'src/env';
import { JwtGuard } from './guards/jwt.guard';
import { RolesGuard } from './guards/roles.guard';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UsersEntity,
    ]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: ENV.security.jwtSecret,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [
    UsersService,
    JwtStrategy,
    JwtGuard,
    RolesGuard,
  ],
  controllers: [
    AuthController,
    UsersController
  ],
  exports: [
    PassportModule,
  ]
})
export class UsersModule { }
