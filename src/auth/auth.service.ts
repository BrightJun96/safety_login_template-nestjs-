import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/user/users.service';
import { SignInDto } from './signIn.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  // 회원가입
  async signUp(signUpDto: SignInDto) {
    this.usersService.create(signUpDto);
    return 'ok';
  }

  // 로그인
  async singIn(userName: string, pw: string): Promise<any> {
    const user = await this.usersService.findOne(userName);
    console.log('db pw:', user?.password);
    console.log('incoming pw :', pw);
    if (user?.password !== pw) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user.id, userName: user.userName };

    return {
      access_token: await this.jwtService.signAsync(payload),
      refresh_token: await this.jwtService.signAsync({ id: payload.sub }),
    };
  }

  /**
   * @description
   * 리프래시
   * 리프래시 토큰을 클라이언트 쿠키에서 조회하여 해당 토큰을 조회해 디비의 리프래시 토큰과 비교하여 해당하는 유저를 반환하고 해당 유저에 대한 access_token을 재생성
   */
  async refresh() {}
}
