import { Module } from '@nestjs/common';
import { ContestsService } from './services/contests.service';
import { ContestRegistrationsService } from './services/contest-registrations.service';
import { ContestsController } from './controllers/contests.controller';

@Module({
  controllers: [
    ContestsController,
  ],
  providers: [
    ContestsService,
    ContestRegistrationsService,
  ]
})
export class ContestsModule { }
