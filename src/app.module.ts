import { Module } from '@nestjs/common';
import { PrismaService } from './database/prisma.service';
import { UserController } from './controllers/user.controller';
import { userRepository } from './repositories/user.repository';
import { prismaUserRepository } from './repositories/prismaRepository/prismaUserRepository';
import { userService } from './services/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { AuthModule } from './modules/auth/auth.module';
import { AuthController } from './controllers/auth.controller';


@Module({
  imports: [AuthModule],
  controllers: [UserController],
  providers: [PrismaService,userService,
    {
      provide:userRepository,
      useClass:prismaUserRepository
    },
    JwtService,
  ],
})
export class AppModule {}
