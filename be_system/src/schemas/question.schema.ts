import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

enum QuestionType {
  MULTIPLE_CHOICE = '0',
  FILL_IN_THE_BLANK = '1',
  ESSAY = '2',
}

@Schema()
export class Question extends Document {
  @Prop({ required: true })
  text: string; // Nội dung câu hỏi

  @Prop({ required: true })
  image: string;

  @Prop({ enum: QuestionType, required: true })
  type: QuestionType; // Loại câu hỏi

  @Prop({ type: [String], default: [] })
  options: string[]; // Danh sách đáp án (chỉ dành cho trắc nghiệm)

  @Prop({ required: true })
  correctAnswer: string; // Đáp án đúng (trắc nghiệm & điền đáp án)

  @Prop({ type: Types.ObjectId, ref: 'Exam', required: true })
  exam: Types.ObjectId; // Thuộc về đề thi nào
}

export const QuestionSchema = SchemaFactory.createForClass(Question);
