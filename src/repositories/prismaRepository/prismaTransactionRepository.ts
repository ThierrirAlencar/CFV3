
import { defaultTransaction, queryTransaction } from "src/interface/defaultTransaction";
import { transactionRepository } from "../transaction.repository";
import { Inject, Injectable } from "@nestjs/common";
import { PrismaService } from "src/database/prisma.service";
import { Prisma, Transaction } from "@prisma/client";

@Injectable()
export class PrismaTransactionRepository implements transactionRepository {
    
    constructor(private prisma: PrismaService){}
    
    async create(data: Prisma.TransactionUncheckedCreateInput):Promise<defaultTransaction> {
        const transaction = await this.prisma.transaction.create({
            data: {
                ...data,
                createdAt: new Date(),
            },
        });

        return {
            title: transaction.title,
            value: transaction.value,
            type: transaction.type,
            createdAt: transaction.createdAt,
        };
    }

    async delete(id: string): Promise<defaultTransaction> {
        return this.prisma.transaction.delete({
            where: { id },
        }).then(transaction => ({
            title: transaction.title,
            value: transaction.value,
            type: transaction.type,
            createdAt: transaction.createdAt,
        }));
    }

    async findManyByAccount(acId: string): Promise<Transaction[]> {
        return this.prisma.transaction.findMany({
            where: { accountId: acId },
        });
    }

    async findManyByFilter(query: queryTransaction, acId: string, config: { page: number; pageSize: number; }): Promise<Transaction[]> {
        const { title, minValue, maxValue, type, createdBefore, createdAfter } = query;
        const { page, pageSize } = config;

        const where: Prisma.TransactionWhereInput = {
            accountId: acId,
            ...(title && { title: { contains: title, mode: 'insensitive' } }),
            ...(minValue !== undefined && { value: { gte: minValue } }),
            ...(maxValue !== undefined && { value: { lte: maxValue } }),
            ...(type && { type }),
            ...(createdBefore && { createdAt: { lt: createdBefore } }),
            ...(createdAfter && { createdAt: { gt: createdAfter } }),
        };

        return this.prisma.transaction.findMany({
            where,
            take: pageSize,
            skip: (page - 1) * pageSize,
        });
    }

    async findOneById(id: string): Promise<Transaction | null> {
        return this.prisma.transaction.findUnique({
            where: { id },
        });
    }

    async update(data: Prisma.TransactionUncheckedUpdateInput, id: string): Promise<defaultTransaction> {
        const transaction = await this.prisma.transaction.update({
            where: { id },
            data,
        });

        return {
            title: transaction.title,
            value: transaction.value,
            type: transaction.type,
            createdAt: transaction.createdAt,
        };
    }

}