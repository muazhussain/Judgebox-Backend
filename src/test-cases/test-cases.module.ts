import { Module } from '@nestjs/common';
import { TestCasesService } from './services/test-cases.service';
import { TestCasesController } from './controllers/test-cases.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TestCase, TestCasesSchema } from './schemas/test-cases.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
        { name: TestCase.name, schema: TestCasesSchema }
    ])
  ],
  controllers: [TestCasesController],
  providers: [TestCasesService]
})
export class TestCasesModule {}
