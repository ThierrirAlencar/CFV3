import { Module } from "@nestjs/common";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { AuthController } from "src/controllers/auth.controller";
import { PrismaService } from "src/database/prisma.service";
import { prismaUserRepository } from "src/repositories/prismaRepository/prismaUserRepository";
import { userRepository } from "src/repositories/user.repository";
import { authService } from "src/services/auth/auth.service";
import { AuthGuard } from "./auth.guard";

const secretK = "TOTALYSAFEANDSECUREJWTKEY"

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: secretK,
      signOptions: { expiresIn: '7d' },
    }),
  ],
  providers: [authService,
        {
          provide:userRepository,
          useClass:prismaUserRepository
        },
        PrismaService,
        AuthGuard
  ],
  controllers: [AuthController],
  exports: [authService],
})
export class AuthModule {}