import { Injectable } from "@nestjs/common";
import { accountRepository } from "../account.repository";
import { PrismaService } from "src/database/prisma.service";

import { defaultAccount } from "src/interface/deafultAccount";
import { retry } from "rxjs";
import { accounQuery } from "src/interface/account-query";
import { Account, Prisma } from "@prisma/client";


@Injectable()
export class prismaAccountRepository implements accountRepository {
    constructor(private prisma: PrismaService) {}

    async create(data: Prisma.AccountUncheckedCreateInput): Promise<defaultAccount> {
        const {description,title,id} = await this.prisma.account.create({
            data,
        })

        return{
            description,
            title,
            id
        }
    }
    async findManyByFilter(query: accounQuery, uid: string,config:{page:number,pageSize:number}): Promise<{paginated:Account[],total:Account[]}> {
        const { query: searchQuery, type, minValue } = query;
        const { page, pageSize } = config;

        const where: Prisma.AccountWhereInput = {
            userId: uid,
            ...(searchQuery && {
                title: {
                    contains: searchQuery,
                    mode: 'insensitive',
                },
            }),
            ...(type && { type }),
            ...(minValue && { value: { gte: minValue } }),
        };

        return {
            paginated:  await this.prisma.account.findMany({
                where,
                take:page * pageSize,
                skip: (page - 1) * pageSize,
            }),
            total:await this.prisma.account.findMany({
                where,
            }),
        }
    }
    async findOneById(id: string): Promise<Account | null> {
        const account = await this.prisma.account.findUnique({
            where: { id },
        });

        return account;
    }
    async findManyByUserl(uid: string): Promise<Account[]> {
        const accounts = await this.prisma.account.findMany({
            where: { userId: uid },
        });
        return accounts;
    } 

    async delete(id: string): Promise<defaultAccount> {
        const account = await this.prisma.account.delete({
            where: { id },
        });

        return {
            title: account.title,
            description: account.description,
            id: account.id,
        };
    }

    async update(data: Prisma.AccountUncheckedUpdateInput, accountId: string): Promise<defaultAccount> {
        const updatedAccount = await this.prisma.account.update({
            where: { id: accountId },
            data,
        });

        return {
            title: updatedAccount.title,
            description: updatedAccount.description,
            id: updatedAccount.id,
        };
    }
}