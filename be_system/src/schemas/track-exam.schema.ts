import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class TrackExam extends Document {
  @Prop({ required: true })
  userId: string;

  @Prop({ type: Types.ObjectId, ref: 'Exam', required: 'true' })
  examId: string;

  @Prop({ required: true })
  action: 'follow' | 'favorite'; // 'follow' để theo dõi, 'favorite' để yêu thích
}

export const TrackExamSchema = SchemaFactory.createForClass(TrackExam);
