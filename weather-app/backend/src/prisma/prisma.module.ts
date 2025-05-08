import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() // 전역 모듈을 등록(해당 모듈을 다른 서비스에서 자동으로 사용)
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
