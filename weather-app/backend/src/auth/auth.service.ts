// src/auth/auth.service.ts
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';  // bcrypt를 사용하여 비밀번호 해싱
import { PrismaService } from '../prisma/prisma.service';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  // 회원가입
  async signup(email: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);  // 비밀번호 해싱
    const user = await this.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });
    return user;
  }

  // 로그인
  async login(email: string, password: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });

    if (!user) {
      throw new Error('User not found');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);  // 비밀번호 비교
    if (!isPasswordValid) {
      throw new Error('Invalid password');
    }

    const payload = { email: user.email, sub: user.id };  // JWT payload
    const accessToken = this.jwtService.sign(payload);  // JWT 발급

    return { access_token: accessToken };  // 클라이언트에 반환
  }

  // 토큰 검증 (예시)
  async validateToken(token: string) {
    try {
      const decoded = this.jwtService.verify(token);  // 토큰 검증
      return decoded;
    } catch (error) {
      throw new Error('Invalid token');
    }
  }
}