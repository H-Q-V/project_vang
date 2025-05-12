import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Exam extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  subject: string;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  teacher: Types.ObjectId;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Question' }] })
  questions: Types.ObjectId[];

  @Prop({ required: true })
  duration: number;

  @Prop({ required: true, type: Date })
  date: Date;

  @Prop({ required: true, type: Date })
  timeStart: Date;

  @Prop({ required: true, type: Date })
  timeEnd: Date;
}

export const ExamSchema = SchemaFactory.createForClass(Exam);
