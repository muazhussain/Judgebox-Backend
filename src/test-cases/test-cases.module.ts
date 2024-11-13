import { Module } from '@nestjs/common';
import { TestCasesController } from './controllers/test-cases.controller';
import { TestCasesService } from './services/test-cases.service';

@Module({
  controllers: [TestCasesController],
  providers: [TestCasesService]
})
export class TestCasesModule {}
