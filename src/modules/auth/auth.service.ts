// src/auth/auth.service.ts
import { Injectable, ForbiddenException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UserService) {}

  async signup(login: string, password: string) {
    const hash = await bcrypt.hash(password, 10);
    return this.usersService.create(login, hash);
  }

  async login(login: string, password: string) {
    const user = this.usersService.findByLogin(login);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new ForbiddenException('Authentication failed');
    }

    const accessToken = jwt.sign(
      { userId: user.id, login: user.login },
      process.env.JWT_ACCESS_SECRET!,
      { expiresIn: '1m' },
    );

    return { accessToken };
  }
}
