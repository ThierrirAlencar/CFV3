import { Module } from "@nestjs/common";
import { AccountController } from "src/controllers/account.controller";
import { PrismaService } from "src/database/prisma.service";
import { accountRepository } from "src/repositories/account.repository";
import { prismaAccountRepository } from "src/repositories/prismaRepository/prismaAccountRepository";
import { PrismaTransactionRepository } from "src/repositories/prismaRepository/prismaTransactionRepository";
import { prismaUserRepository } from "src/repositories/prismaRepository/prismaUserRepository";
import { transactionRepository } from "src/repositories/transaction.repository";
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
    {
        provide: transactionRepository,
        useClass:PrismaTransactionRepository
    },
    accountService,PrismaService
  ],
  controllers: [AccountController],
  exports: [accountService],
})
export class accountModule {}