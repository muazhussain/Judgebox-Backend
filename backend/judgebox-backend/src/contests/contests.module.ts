import { Module } from '@nestjs/common';
import { ContestsService } from './services/contests.service';
import { ContestRegistrationsService } from './services/contest-registrations.service';
import { ContestsController } from './controllers/contests.controller';
import { ContestRegistrationsController } from './controllers/contest-registrations.controller';
import { ContestProblemsController } from './controllers/contest-problems.controller';

@Module({
  controllers: [
    ContestsController,
    ContestRegistrationsController,
    ContestProblemsController,
  ],
  providers: [
    ContestsService,
    ContestRegistrationsService,
  ]
})
export class ContestsModule { }
