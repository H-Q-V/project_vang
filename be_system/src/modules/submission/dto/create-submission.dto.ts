// create-submission.dto.ts
import { Type } from 'class-transformer';
import {
  IsArray,
  IsMongoId,
  IsNotEmpty,
  IsString,
  ValidateNested,
  ArrayMinSize,
} from 'class-validator';

// DTO cho từng câu trả lời
export class AnswerDto {
  @IsMongoId()
  @IsNotEmpty({ message: 'ID câu hỏi không được để trống' })
  question: string;

  @IsString()
  @IsNotEmpty({ message: 'Câu trả lời không được để trống' })
  answer: string;
}

export class CreateSubmissionDto {
  @IsMongoId()
  @IsNotEmpty({ message: 'ID học sinh không được để trống' })
  student: string;

  @IsMongoId()
  @IsNotEmpty({ message: 'ID bài thi không được để trống' })
  exam: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AnswerDto)
  @ArrayMinSize(1, { message: 'Phải có ít nhất một câu trả lời' })
  answers: AnswerDto[];

  startTime?: Date;
  endTime?: Date;
}
