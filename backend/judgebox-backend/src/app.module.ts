import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProblemsModule } from './problems/problems.module';
import { ContestsModule } from './contests/contests.module';
import { SubmissionsModule } from './submissions/submissions.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'dpg-csobl20gph6c73bp8plg-a',
      port: 5432,
      username: 'judgebox_user',
      password: 'aGcYY4OpQNZX58qAGFMJr7zPuxLuVUFt',
      database: 'judgebox',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    UsersModule,
    ProblemsModule,
    ContestsModule,
    SubmissionsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
