import { Module } from '@nestjs/common';
import { SubmissionService } from './submission.service';
import { SubmissionController } from './submission.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { SubmissionSchema } from 'src/schemas/submission.schema';
import { QuestionSchema } from 'src/schemas/question.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Submission', schema: SubmissionSchema },
      { name: 'Question', schema: QuestionSchema },
    ]),
  ],
  controllers: [SubmissionController],
  providers: [SubmissionService],
})
export class SubmissionModule {}
