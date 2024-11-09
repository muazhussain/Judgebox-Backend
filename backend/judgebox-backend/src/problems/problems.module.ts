import { Module } from '@nestjs/common';
import { ProblemsController } from './controllers/problems.controller';
import { ProblemsService } from './services/problems.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProblemsEntity } from './entities/problems.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProblemsEntity])
  ],
  controllers: [ProblemsController],
  providers: [ProblemsService]
})
export class ProblemsModule { }
