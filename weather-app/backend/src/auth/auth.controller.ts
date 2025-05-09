// src/auth/auth.controller.ts
import { Controller, Post, Body, Get, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';  // JWT 인증을 위한 Guard

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    return this.authService.signup(email, password);
  }

  @Post('login')
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    return this.authService.login(email, password);
  }

  // 보호된 API
  @Get('protected')
  @UseGuards(JwtAuthGuard)  // JWT 인증을 위한 Guard 적용
  getProtectedRoute(@Request() req) {
    return { message: 'You have access to this route', user: req.user };
  }
}
