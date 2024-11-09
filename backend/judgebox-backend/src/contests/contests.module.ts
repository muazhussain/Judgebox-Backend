import { Module } from '@nestjs/common';
import { ContestsService } from './services/contests.service';

@Module({
  controllers: [],
  providers: [
    ContestsService,
  ]
})
export class ContestsModule { }
