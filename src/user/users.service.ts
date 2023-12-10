import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { SignInDto } from 'src/auth/signIn.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  // 회원조회
  findOne(userName: string): Promise<User | null> {
    return this.usersRepository.findOne({
      where: {
        userName,
      },
    });
  }

  // 회원생성
  create(user: SignInDto) {
    this.usersRepository.save(user);
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }

  // async create(): Promise<void> {
  //   return this.usersRepository.save();
  // }
}
