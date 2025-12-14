import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from './user.entity';
//import { v4 as uuid } from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserResponseDto } from './user.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class UserService {
  private users: User[] = [];
  constructor(
    @InjectRepository(User)
    private readonly repo: Repository<User>,
  ) {}
  async getAll() {
    const users = await this.repo.find();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return users.map((user) =>
      plainToInstance(UserResponseDto, user, { excludeExtraneousValues: true }),
    );
  }

  async getById(id: string) {
    const user = await this.repo.findOne({ where: { id } });
    if (!user) throw new NotFoundException('User not found');
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...response } = user;
    return plainToInstance(UserResponseDto, user, {
      excludeExtraneousValues: true,
    });
  }

  async create(login: string, password: string) {
    const timestamp = new Date();
    const newUser = this.repo.create({
      login,
      password,
      version: 1,
      createdAt: timestamp,
      updatedAt: timestamp,
    });
    await this.repo.save(newUser);
    return plainToInstance(UserResponseDto, newUser, {
      excludeExtraneousValues: true,
    });
  }

  async updatePassword(id: string, oldPassword: string, newPassword: string) {
    const user = await this.repo.findOneBy({ id });
    if (!user) throw new NotFoundException('User not found');
    if (user.password !== oldPassword)
      throw new ForbiddenException('Old password is wrong');

    user.password = newPassword;
    user.version++;
    user.updatedAt = new Date();
    const updated = await this.repo.save(user);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...response } = updated;
    return plainToInstance(UserResponseDto, user, {
      excludeExtraneousValues: true,
    });
  }

  async delete(id: string) {
    const result = await this.repo.delete(id);

    if (result.affected === 0) throw new NotFoundException('User not found');
  }
  findByLogin(login: string) {
    return this.users.find((u) => u.login === login);
  }
}
