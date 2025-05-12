import {
  Injectable,
  NestMiddleware,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../common/util/jwt';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    const authorization = req.header('Authorization');
    if (!authorization) {
      throw new HttpException('INVALID_TOKEN', HttpStatus.UNAUTHORIZED);
    }
    const bearer = authorization.split(' ').pop();
    if (!bearer) {
      throw new HttpException('INVALID_TOKEN', HttpStatus.UNAUTHORIZED);
    }
    const user = await verifyToken(bearer);

    if (!user || !user.id) {
      throw new HttpException('WRONG_TOKEN', HttpStatus.UNAUTHORIZED);
    }

    req['user'] = user;
    next();
  }
}
