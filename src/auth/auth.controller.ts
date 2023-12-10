import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './signIn.dto';
import { AuthGuard } from './auth.guard';
import { Public } from 'src/app.public';

@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // 로그인
  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.singIn(signInDto.userName, signInDto.password);
  }

  // 프로필 조회
  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req: any) {
    return req.user;
  }

  // 회원가입
  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('signup')
  signUp(@Body() signUpDto: SignInDto) {
    return this.authService.signUp(signUpDto);
  }
}
