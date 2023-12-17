import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './signIn.dto';
import { AuthGuard } from './auth.guard';
import { Public } from 'src/app.public';
import { Request, Response } from 'express';

@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // 로그인
  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(
    @Body() signInDto: SignInDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const tokens = await this.authService.singIn(
      signInDto.userName,
      signInDto.password,
    );

    response.cookie('refresh_token', tokens.refresh_token);
    return tokens.access_token;
  }

  // 프로필 조회
  // @UseGuards(AuthGuard)
  // @Get('profile')
  // getProfile(@Request() req: any) {
  //   return req.user;
  // }

  // 회원가입
  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('signup')
  signUp(@Body() signUpDto: SignInDto) {
    return this.authService.signUp(signUpDto);
  }

  // 리프래쉬
  @Public()
  @Get('refresh')
  refresh(@Req() request: Request) {
    const refreshToken = request.cookies['refresh_token'];

    if (!refreshToken) {
      throw new HttpException(
        {
          message: '리프래시 토큰이 쿠키에 존재하지 않습니다.',
          code: 'A01',
        },
        HttpStatus.UNAUTHORIZED,
      );
      // return '리프래쉬 토큰이 존재하지 않습니다.';
    }

    const result = this.authService.compareToken(refreshToken);

    return result;
  }
}
