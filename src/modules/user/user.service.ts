import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { v4 as uuid } from 'uuid';

@Injectable()
export class UserService {
  private users: User[] = [];

  getAll() {
    return this.users.map(({ password, ...user }) => user);
  }

  getById(id: string) {
    const user = this.users.find((u) => u.id === id);
    if (!user) return null;
    const { password, ...response } = user;
    return response;
  }

  create(login: string, password: string) {
    const timestamp = Date.now();
    const newUser: User = {
      id: uuid(),
      login,
      password,
      version: 1,
      createdAt: timestamp,
      updatedAt: timestamp,
    };
    this.users.push(newUser);

    const { password: _, ...response } = newUser;
    return response;
  }

  updatePassword(id: string, oldPassword: string, newPassword: string) {
    const user = this.users.find((u) => u.id === id);
    if (!user) return 'not_found';
    if (user.password !== oldPassword) return 'wrong_password';

    user.password = newPassword;
    user.version++;
    user.updatedAt = Date.now();

    const { password, ...response } = user;
    return response;
  }

  delete(id: string) {
    const index = this.users.findIndex((u) => u.id === id);
    if (index === -1) return false;

    this.users.splice(index, 1);
    return true;
  }
}
