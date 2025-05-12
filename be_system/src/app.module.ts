import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './modules/users/users.module';
import { ExamModule } from './modules/exam/exam.module';
import { AuthModule } from './modules/auth/auth.module';
import { QuestionsModule } from './modules/questions/questions.module';
import { SubmissionModule } from './modules/submission/submission.module';
import { AuthMiddleware } from './middleware/auth.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: './.env',
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGO_URL || ''),
    UsersModule,
    ExamModule,
    AuthModule,
    QuestionsModule,
    SubmissionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude(
        { path: 'api/auth/register', method: RequestMethod.POST },
        { path: 'api/auth/google', method: RequestMethod.GET },
        { path: 'api/auth/google/redirect', method: RequestMethod.GET },
      )
      .forRoutes('*');
  }
}
