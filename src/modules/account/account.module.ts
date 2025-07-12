import { Module } from "@nestjs/common";
import { AccountController } from "src/controllers/account.controller";
import { PrismaService } from "src/database/prisma.service";
import { accountRepository } from "src/repositories/account.repository";
import { prismaAccountRepository } from "src/repositories/prismaRepository/prismaAccountRepository";
import { prismaUserRepository } from "src/repositories/prismaRepository/prismaUserRepository";
import { userRepository } from "src/repositories/user.repository";
import { accountService } from "src/services/accounts/account.service";

@Module({
  imports: [

  ],
  providers: [
    {
        provide: accountRepository,
        useClass: prismaAccountRepository
    },
    {
        provide: userRepository,
        useClass: prismaUserRepository
    },
    accountService,PrismaService
  ],
  controllers: [AccountController],
  exports: [accountService],
})
export class accountModule {}