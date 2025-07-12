import { Injectable } from "@nestjs/common";
import { Prisma, Transaction, Type } from "generated/prisma";
import { EntityDoesNotExistsError } from "src/errors/entityDoesNotExists.error";
import { defaultTransaction } from "src/interface/defaultTransaction";
import { accountRepository } from "src/repositories/account.repository";
import { transactionRepository } from "src/repositories/transaction.repository";


@Injectable()
export class transactionService{
    constructor(
        private transactionRepository:transactionRepository,
        private accountRepository:accountRepository 
    ){}

    async create(data:Prisma.TransactionUncheckedCreateInput):Promise<defaultTransaction>{
        const doesTheAccountExist = await this.accountRepository.findOneById(data.accountId);

        if(!doesTheAccountExist) throw new EntityDoesNotExistsError("Account",data.accountId);

        return await this.transactionRepository.create(data);
    }   

    async findManyByFilter(
            filterData:{
                title?:string;
                minValue?:number;
                maxValue?:number;
                type?: Type;
                createdBefore?:Date;
                createdAfter?:Date;
                categoryId?:string;
            },
            accountId:string, 
            page:number,
            pageSize:number = 6
        ):Promise<Transaction[]>{

            const doesTheAccountExist = await this.accountRepository.findOneById(accountId);

            if (!doesTheAccountExist) {
                throw new EntityDoesNotExistsError("account",accountId)
            }

            const { title, type, minValue, maxValue } = filterData;

            if (title || type || minValue || maxValue) {
                return this.transactionRepository.findManyByFilter({

                }, accountId,{
                    page: Number(page),
                    pageSize: Number(pageSize),
                });
            }else{
                return this.transactionRepository.findManyByAccount(accountId);
            }
    }

    async findOneById(id:string):Promise<Transaction>{
        const doesTheTransactionExist = await this.transactionRepository.findOneById(id);
        if(doesTheTransactionExist){
            return doesTheTransactionExist;
        }else{
            throw new EntityDoesNotExistsError("Transaction", id);
        }
    }

    async delete(id:string):Promise<defaultTransaction>{
        const doesTheTransactionExist = await this.transactionRepository.findOneById(id);
        if(doesTheTransactionExist){
            return this.transactionRepository.delete(id);
        }else{
            throw new EntityDoesNotExistsError("Transaction", id);
        }
    }

    async update(id:string, data:Prisma.TransactionUncheckedUpdateInput):Promise<defaultTransaction>{
        const doesTheTransactionExist = await this.transactionRepository.findOneById(id);
        if(doesTheTransactionExist){
            return this.transactionRepository.update(data,id);
        }else{
            throw new EntityDoesNotExistsError("Transaction", id);
        }
    }
}