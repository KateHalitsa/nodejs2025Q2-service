// src/auth/jwt.guard.ts
import {
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

export class JwtAuthGuard implements CanActivate {
  canActivate(ctx: ExecutionContext): boolean {
    const req = ctx.switchToHttp().getRequest();
    const auth = req.headers['authorization'];

    if (!auth || !auth.startsWith('Bearer ')) {
      throw new UnauthorizedException('Unauthorized');
    }

    try {
      jwt.verify(auth.split(' ')[1], process.env.JWT_ACCESS_SECRET!);
      return true;
    } catch {
      throw new UnauthorizedException('Token invalid or expired');
    }
  }
}
