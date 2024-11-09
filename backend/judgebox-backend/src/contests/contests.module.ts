import { Module } from '@nestjs/common';
import { ContestsService } from './services/contests.service';
import { ContestsRegistrationsService } from './services/contests-registrations.service';

@Module({
  controllers: [],
  providers: [
    ContestsService,
    ContestsRegistrationsService,
  ]
})
export class ContestsModule { }
