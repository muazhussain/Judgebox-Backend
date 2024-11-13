import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProblemsModule } from './problems/problems.module';
import { ContestsModule } from './contests/contests.module';
import { SubmissionsModule } from './submissions/submissions.module';
import { TestCasesModule } from './test-cases/test-cases.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'judgebox',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
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
