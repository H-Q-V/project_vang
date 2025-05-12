import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Submission extends Document {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  student: Types.ObjectId; // Học sinh làm bài

  @Prop({ type: Types.ObjectId, ref: 'Exam', required: true })
  exam: Types.ObjectId; // Bài thi nào

  @Prop({
    type: [
      {
        question: { type: Types.ObjectId, ref: 'Question' },
        answer: { type: String, required: true },
      },
    ],
    required: true,
  })
  answers: { question: Types.ObjectId; answer: string }[];

  @Prop()
  score: number; // Điểm số

  @Prop()
  correctAnswers: number;

  @Prop()
  totalQuestions: number;

  @Prop()
  timeTaken: number;

  @Prop({ default: Date.now })
  submittedAt: Date;
}

export const SubmissionSchema = SchemaFactory.createForClass(Submission);
