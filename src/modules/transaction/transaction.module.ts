import { Module } from "@nestjs/common";
import { TransactionController } from "src/controllers/transaction.controller";
import { PrismaService } from "src/database/prisma.service";
import { accountRepository } from "src/repositories/account.repository";
import { prismaAccountRepository } from "src/repositories/prismaRepository/prismaAccountRepository";
import { PrismaTransactionRepository } from "src/repositories/prismaRepository/prismaTransactionRepository";
import { transactionRepository } from "src/repositories/transaction.repository";
import { transactionService } from "src/services/transactions/transaction.service";


@Module({
    imports: [],
    providers: [
        {
            provide: transactionRepository,
            useClass: PrismaTransactionRepository
        },
        {
            provide: accountRepository,
            useClass: prismaAccountRepository 
        },
        PrismaService,transactionService
    ],
    controllers: [TransactionController],
    exports: [transactionService]
})
export class TransactionModule{}