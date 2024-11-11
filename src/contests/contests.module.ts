import { Module } from '@nestjs/common';
import { ContestsService } from './services/contests.service';
import { ContestRegistrationsService } from './services/contest-registrations.service';
import { ContestsController } from './controllers/contests.controller';
import { ContestRegistrationsController } from './controllers/contest-registrations.controller';
import { ContestProblemsController } from './controllers/contest-problems.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContestsEntity } from './entities/contests.entity';
import { ContestRegistrationsEntity } from './entities/contest-registrations.entity';
import { ContestProblemsService } from './services/contest-problems.service';
import { ContestProblemsEntity } from './entities/contest-problems.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ContestsEntity,
      ContestRegistrationsEntity,
      ContestProblemsEntity,
    ])
  ],
  controllers: [
    ContestsController,
    ContestRegistrationsController,
    ContestProblemsController,
  ],
  providers: [
    ContestsService,
    ContestRegistrationsService,
    ContestProblemsService,
  ]
})
export class ContestsModule { }
