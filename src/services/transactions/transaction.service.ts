import { Injectable } from "@nestjs/common";
import { Account, Prisma, Transaction, Type } from "generated/prisma";
import { EntityDoesNotExistsError } from "src/errors/entityDoesNotExists.error";
import { defaultTransaction } from "src/interface/defaultTransaction";
import { accountRepository } from "src/repositories/account.repository";
import { transactionRepository } from "src/repositories/transaction.repository";
import { userRepository } from "src/repositories/user.repository";



export interface transactionListByFilter{
    transactions:Transaction[]
    data:{
        resume:{
            total:{
                value:number,
                outcome:number,
                income:number,
            },
            percent:{
                outcome:number,
                income:number,
            }
        },
        account?:Account | null //if there's an account
    },
    meta:{
        sizeList:number,
    }
}

@Injectable()
export class transactionService{
    constructor(
        private transactionRepository:transactionRepository,
        private accountRepository:accountRepository,
        private userRepository:userRepository
    ){}

    async create(data:Prisma.TransactionUncheckedCreateInput):Promise<defaultTransaction>{
        const doesTheAccountExist = await this.accountRepository.findOneById(data.accountId);

        if(!doesTheAccountExist) throw new EntityDoesNotExistsError("Account",data.accountId);
        
        //alterar o valor da conta baseado na transação 
        switch(data.type){
            case "income":
                this.accountRepository.update({
                    value:(doesTheAccountExist.value+data.value)
                },doesTheAccountExist.id); break;
            case "outcome":
                this.accountRepository.update({
                    value:(doesTheAccountExist.value-data.value)
                },doesTheAccountExist.id); break;
        }
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
                accountId?:string, 
            },
            userId:string,
            page:number,
            pageSize:number = 6
        ):Promise<transactionListByFilter>{
            
            const {accountId,categoryId,createdAfter,createdBefore,maxValue,minValue,title,type} = filterData
            //step 1 - get the entire user transaction list
            var transactions:Transaction[] = [];

            const data = {
                sizeTotal:0,
                totalValue:0,
                incomeValue:0,
                outcomeValue:0,
                incomeSize:0,
                outcomeSize:0,
                account:null
            }

            const doesTheUserExists = await this.userRepository.findOneById(userId);


            if (!doesTheUserExists) {
                throw new EntityDoesNotExistsError("user",userId)
            }
            
            //step 3 - Checks if there's an specific account
            if(accountId){
            
                const doesTheAccountExist = await this.accountRepository.findOneById(accountId);

                if(!doesTheAccountExist) throw new EntityDoesNotExistsError("Account",accountId);
                
                //step 4 (if there's a specific account) - filter only trough this account
                transactions = await this.transactionRepository.findManyByFilter({
                        createdAfter,createdBefore,maxValue,minValue,title,type
                    },accountId,{
                        page,pageSize
                })
                
                //Returns the total size of the list 
                data.sizeTotal = (await this.transactionRepository.findManyByAccount(accountId)).length
                console.log("Total Found:",data.sizeTotal)
                //gets more info
                transactions.forEach(e=>{
                        if(e.type=="income"){
                            data.incomeValue+=e.value;
                            data.incomeSize++
                        }else{
                            data.outcomeValue+=e.value;
                            data.outcomeSize++
                        }  
                        data.totalValue+=e.value;                  
                })
                data.account = await this.accountRepository.findOneById(accountId)      
            //step 4 (if there's no specific account) - filters trought all the users accounts to find
            }else{
                //Goes trough all of the transactions and returns the amount here
                await Promise.all((await this.accountRepository.findManyByUserl(userId)).map(async e=>{
                    //
                    const _tran = await this.transactionRepository.findManyByFilter({
                        createdAfter,createdBefore,maxValue,minValue,title,type
                    },e.id,{
                        page,pageSize
                    })
                    _tran.forEach(e=>{
                        if(e.type=="income"){
                            data.incomeValue+=e.value;
                            data.incomeSize++
                        }else{
                            data.outcomeValue+=e.value;
                            data.outcomeSize++
                        }  
                        data.totalValue+=e.value;                  
                    })
                    transactions = transactions.concat(_tran)
                    let _len = (await this.transactionRepository.findManyByAccount(accountId)).length;
                    data.sizeTotal += _len;
                }))
                //Returns the total size of the list
                
                console.log("Total Found:",data.sizeTotal)
            }

            //step 5 - get some more data

            return {
                transactions,
                data:{
                    resume:{
                        percent:{
                            income:(data.incomeValue/data.totalValue)*100,
                            outcome:(data.outcomeValue/data.totalValue)*100,
                        },
                        total:{
                            income:data.incomeValue,
                            outcome:data.outcomeValue,
                            value:data.totalValue
                        }
                    },
                    account:data.account
                },
                meta:{
                    sizeList:data.sizeTotal
                }
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
            const account = await this.accountRepository.findOneById(doesTheTransactionExist.accountId)
            const transaction =await this.transactionRepository.delete(id);
            //alterar o valor da conta baseado na transação 
            switch(transaction.type){
                case "income":
                    this.accountRepository.update({
                        value:(account.value-transaction.value)
                    },account.id); break;
                case "outcome":
                    this.accountRepository.update({
                        value:(account.value+transaction.value)
                    },account.id); break;
            }
            return transaction
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