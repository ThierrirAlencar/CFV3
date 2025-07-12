import { Injectable } from "@nestjs/common";
import { Account, AccountType, Prisma } from "generated/prisma/client";
import { EntityDoesNotExistsError } from "src/errors/entityDoesNotExists.error";
import { defaultAccount } from "src/interface/deafultAccount";
import { accountRepository } from "src/repositories/account.repository";
import { userRepository } from "src/repositories/user.repository";

interface CreateAccountDto {
    title: string;
    description?: string;
    type: AccountType;
    value: number;
}

@Injectable()
export class accountService{
    constructor(
        private accountRepository:accountRepository,
        private userRepository:userRepository
    ){}

    async create(userId: string, accountData: CreateAccountDto):Promise<defaultAccount> {
        const { title, description, type, value } = accountData;    
        const doesTheUserExists = await this.userRepository.findOneById(userId);

        if (!doesTheUserExists) {
            throw new EntityDoesNotExistsError("user",userId)
        }

        const account = await this.accountRepository.create({
            title,
            userId,description,type,value
        })

        return {
            id: account.id,
            title: account.title,
            description: account.description || "",
        };
    }

    async findOneById(id: string):Promise<Account | null> {
        return this.accountRepository.findOneById(id);
    }

    async findManyByUserId(userId: string):Promise<Account[]> {
        const doesTheUserExists = await this.userRepository.findOneById(userId);

        if (!doesTheUserExists) {
            throw new EntityDoesNotExistsError("user",userId)
        }

        return this.accountRepository.findManyByUserl(userId);
    }

    async findManyByFilter(
        filterData:{
            query?:string,
            type?:AccountType,
            minValue?:number,
            maxValue?:number,
        },
        userId:string, 
        page:number,
        pageSize:number = 6
    ):Promise<Account[]>{

        const doesTheUserExists = await this.userRepository.findOneById(userId);

        if (!doesTheUserExists) {
            throw new EntityDoesNotExistsError("user",userId)
        }

        const { query, type, minValue, maxValue } = filterData;

        if (query || type || minValue || maxValue) {
            return this.accountRepository.findManyByFilter({
                query,
                type,
                minValue,
                maxValue,
            }, userId,{
                page: Number(page),
                pageSize: Number(pageSize),
            });
        }else{
            const doesTheUserExists = await this.userRepository.findOneById(userId);

            if (!doesTheUserExists) {
                throw new EntityDoesNotExistsError("user",userId)
            }
            return this.accountRepository.findManyByUserl(userId);
        }
    }

    async update(id: string, updateData: Prisma.AccountUncheckedUpdateInput):Promise<defaultAccount> {
        const account = await this.accountRepository.findOneById(id);

        if (!account) {
            throw new EntityDoesNotExistsError("account", id);
        }

        return this.accountRepository.update(updateData,id);
    }

    async delete(id:string):Promise<defaultAccount> {
        const account = await this.accountRepository.findOneById(id);

        if (!account) {
            throw new EntityDoesNotExistsError("account", id);
        }

        return this.accountRepository.delete(id);
    }
}