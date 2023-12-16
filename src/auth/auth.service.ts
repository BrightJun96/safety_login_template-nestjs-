import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/user/users.service';
import { SignInDto } from './signIn.dto';
import { IToken } from './interfaces/auth.interface';
import { jwtDecode } from 'jwt-decode';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  // 회원가입
  async signUp(signUpDto: SignInDto) {
    const user = await this.usersService.findOne(signUpDto.userName);

    console.log('중복 유저 :', user);

    if (user) return '닉네임이 중복되었습니다.';

    this.usersService.create(signUpDto);
    return 'ok';
  }

  // 로그인
  async singIn(userName: string, pw: string): Promise<IToken> {
    const user = await this.usersService.findOne(userName);
    console.log('db pw:', typeof user?.password);
    console.log('incoming pw :', typeof pw);

    console.log('password same ? :', user?.password === pw);

    if (user?.password !== String(pw)) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user.id, userName: user.userName };

    const access_token = await this.jwtService.signAsync(payload);
    const refresh_token = await this.jwtService.signAsync({ id: payload.sub });

    this.usersService.tokenSave(user.id, refresh_token, user);

    return {
      access_token,
      refresh_token,
    };
  }

  /**
   * @description
   * 리프래시
   * 리프래시 토큰을 클라이언트 쿠키에서 조회하여 해당 토큰을 조회해 디비의 리프래시 토큰과 비교하여 해당하는 유저를 반환하고 해당 유저에 대한 access_token을 재생성
   */
  async compareToken(token: string) {
    const decodingToken = jwtDecode(token);
    const parsedToken = JSON.parse(JSON.stringify(decodingToken));
    const userId = parsedToken['id'];
    console.log('디코딩 리프래시 토큰 :', userId);
    if (!userId) return '토큰에 유저 정보가 존재하지 않습니다.';
    const user = await this.usersService.findById(userId);

    if (!user) return '해당 유저가 존재하지 않습니다.';
    const payload = { sub: user.id, userName: user.userName };

    const access_token = await this.jwtService.signAsync(payload);
    return access_token;
  }
}
