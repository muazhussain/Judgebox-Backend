import { 
    Prop, 
    Schema, 
    SchemaFactory 
} from "@nestjs/mongoose";
import { Document } from 'mongoose';

export type TestCaseDocument = TestCase & Document;

@Schema({collection: 'test-cases'})
export class TestCase {
    @Prop({
        type: String,
        required: true,
    })
    problemId: string;

    @Prop({
        type: String,
        required: true,
    })
    input: string;

    @Prop({
        type: String,
        required: true,
    })
    output: string;

    @Prop({
        type: Number,
        required: true,
    })
    order: number;
}

export const TestCasesSchema = SchemaFactory.createForClass(TestCase);