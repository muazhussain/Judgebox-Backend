import { Module } from '@nestjs/common';
import { ContestsService } from './services/contests.service';
import { ContestsRegistrationsService } from './services/contests-registrations.service';
import { ContestsController } from './controllers/contests.controller';

@Module({
  controllers: [
    ContestsController,
  ],
  providers: [
    ContestsService,
    ContestsRegistrationsService,
  ]
})
export class ContestsModule { }
