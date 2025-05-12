import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ExamService } from './exam.service';
import { ExamController } from './exam.controller';
import { Exam, ExamSchema } from '../../schemas/exam.schema';
import { Question, QuestionSchema } from '../../schemas/question.schema';
import { Submission, SubmissionSchema } from '../../schemas/submission.schema';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Exam.name, schema: ExamSchema },
      { name: Question.name, schema: QuestionSchema },
      { name: Submission.name, schema: SubmissionSchema },
    ]),
  ],
  controllers: [ExamController],
  providers: [ExamService],
})
export class ExamModule {}
