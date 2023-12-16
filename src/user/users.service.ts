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

  // 회원조회(아이디)
  findOne(userName: string): Promise<User | null> {
    return this.usersRepository.findOne({
      where: {
        userName,
      },
    });
  }

  // 회원조회(pk Id)
  findById(id: number) {
    return this.usersRepository.findOne({
      where: {
        id,
      },
    });
  }

  // 회원생성
  create(user: SignInDto) {
    this.usersRepository.save(user);
  }

  // 회원제거
  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }

  // 리프래쉬 토큰 저장
  async tokenSave(userId: number, refreshToken: string, user: User) {
    if (!user) {
      return '해당 유저가 존재하지않습니다.';
    }

    user.refreshToken = refreshToken;

    await this.usersRepository.update(userId, user);
  }

  // async create(): Promise<void> {
  //   return this.usersRepository.save();
  // }
}
