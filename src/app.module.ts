import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProblemsModule } from './problems/problems.module';
import { ContestsModule } from './contests/contests.module';
import { SubmissionsModule } from './submissions/submissions.module';
import { TestCasesModule } from './test-cases/test-cases.module';
import { ENV } from './env';
import { MongooseModule } from '@nestjs/mongoose';
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: ENV.database.url,
      logging: ENV.database.logging,
      entities: [ENV.database.entities],
      synchronize: ENV.database.synchronize,
      autoLoadEntities: ENV.database.autoLoadEntities,
    }),
    MongooseModule.forRoot(ENV.mongodb.uri),
    BullModule.forRoot({
      redis: ENV.redis.url,
    }),
    UsersModule,
    ProblemsModule,
    ContestsModule,
    SubmissionsModule,
    TestCasesModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }