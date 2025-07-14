import { Injectable } from "@nestjs/common";
import { Account, AccountType, Prisma, Transaction } from "@prisma/client";

import { EntityDoesNotExistsError } from "src/errors/entityDoesNotExists.error";
import { defaultAccount } from "src/interface/deafultAccount";
import { accountRepository } from "src/repositories/account.repository";
import { transactionRepository } from "src/repositories/transaction.repository";
import { userRepository } from "src/repositories/user.repository";

interface CreateAccountDto {
    title: string;
    description?: string;
    type: AccountType;
    value: number;

}
export type resume = {
        transactions:number,
        income:number,
        outcome:number,
        per_income:number,
        per_outcome:number
}
export interface detailedAccount{
    id: string;
    title: string;
    value: number;
    description: string | null;
    userId: string;
    type: AccountType;
    resume:resume
}
export interface accountListByFilter{
    filteredAccounts:detailedAccount[]
    totalAccounts:detailedAccount[],
    data:{
        value:number,
        outcome:number,
        income:number
    },
    transactions:{
        size:number,
        income:number,
        outcome:number,
        list:Transaction[]
    }
}
@Injectable()
export class accountService{
    constructor(
        private accountRepository:accountRepository,
        private userRepository:userRepository,
        private transactionRepository:transactionRepository
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
    ):Promise<accountListByFilter>{

        const doesTheUserExists = await this.userRepository.findOneById(userId);

        if (!doesTheUserExists) {
            throw new EntityDoesNotExistsError("user",userId)
        }

        const { query, type, minValue, maxValue } = filterData;

        
            const accountList = await this.accountRepository.findManyByFilter({
                query,
                type,
                minValue,
                maxValue,
            }, userId,{
                page: Number(page),
                pageSize: Number(pageSize),
            });
            const accountValue = {
                sum:0,
                withDrawValue:0,
                depositValue:0,
                totalAccountTransactions:0,
                totalDepositTransactions:0,
                totalWithdrawTransactions:0
            }
            const transactions:Transaction[] = []
            await Promise.all(accountList.total.map(async e=>{
                const tList = await this.transactionRepository.findManyByAccount(e.id);
                let value = 0;
                tList.forEach(d=>{
                    if(d.type=="income"){
                        value+=d.value
                        accountValue.depositValue+=d.value
                        accountValue.totalDepositTransactions++
                    }else{
                        value-=d.value
                        accountValue.withDrawValue+=d.value
                        accountValue.totalDepositTransactions++
                    }
                    transactions.push(d)
                })
            }))

            return{
                filteredAccounts:await Promise.all(accountList.paginated.map(async s=>{
                    const transactions = await this.transactionRepository.findManyByAccount(s.id)
                    let income=0;let outcome=0;
                    transactions.forEach(e=>{
                        if(e.type=="income"){
                            income+=e.value;
                        }else{
                            outcome+=e.value
                        }
                    })
                    return{
                        description:s.description,
                        id:s.id,
                        title:s.title,
                        type:s.type,
                        userId:s.userId,
                        value:s.value,
                        resume:{
                            income,outcome,
                            per_income:(income/s.value)*100,
                            per_outcome:(outcome/s.value)*100,
                            transactions:transactions.length
                        }
                    }
                })),
                totalAccounts:await Promise.all(accountList.total.map(async s=>{
                    const transactions = await this.transactionRepository.findManyByAccount(s.id)
                    let income=0;let outcome=0;
                    transactions.forEach(e=>{
                        if(e.type=="income"){
                            income+=e.value;
                        }else{
                            outcome+=e.value
                        }
                    })
                    return{
                        description:s.description,
                        id:s.id,
                        title:s.title,
                        type:s.type,
                        userId:s.userId,
                        value:s.value,
                        resume:{
                            income,outcome,
                            per_income:(income/s.value)*100,
                            per_outcome:(outcome/s.value)*100,
                            transactions:transactions.length
                        }
                    }
                })),
                data:{
                    value:accountValue.sum,
                    outcome:accountValue.withDrawValue,
                    income:accountValue.depositValue
                },
                transactions:{
                    size:transactions.length,
                    income:accountValue.depositValue,
                    outcome:accountValue.withDrawValue,
                    list:transactions
                }
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