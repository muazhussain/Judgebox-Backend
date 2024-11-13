import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProblemsModule } from './problems/problems.module';
import { ContestsModule } from './contests/contests.module';
import { SubmissionsModule } from './submissions/submissions.module';
import { TestCasesModule } from './test-cases/test-cases.module';
import { ENV } from './env';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: ENV.database.type as any,
      host: ENV.database.host,
      port: ENV.database.port,
      username: ENV.database.username,
      password: ENV.database.password,
      database: ENV.database.database,
      logging: ENV.database.logging,
      entities: [ENV.database.entities],
      synchronize: ENV.database.synchronize,
      autoLoadEntities: ENV.database.autoLoadEntities,
    }),
    MongooseModule.forRoot(ENV.mongodb.uri),
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
