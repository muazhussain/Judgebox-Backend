import { Module } from '@nestjs/common';
import { SubmissionsService } from './services/submissions.service';
import { SubmissionsController } from './controllers/submissions.controller';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubmissionsEntity } from './entities/submissions.entity';
import { WebSocketGateway } from '@nestjs/websockets';
import { BullModule } from '@nestjs/bull';
import { SubmissionGateway } from './gateways/websocket.gateway';
import { JudgeProcessor } from './processors/judge.processor';

@Module({
  imports: [
    TypeOrmModule.forFeature([SubmissionsEntity]),
    HttpModule,
    BullModule.registerQueue({
      name: 'judge-queue'
    }),
  ],
  providers: [
    SubmissionsService,
    SubmissionGateway,
    JudgeProcessor,
  ],
  controllers: [SubmissionsController]
})
export class SubmissionsModule { }
