
import { Prisma, Transaction } from "@prisma/client";
import { accounQuery } from "src/interface/account-query";
import { defaultTransaction, queryTransaction } from "src/interface/defaultTransaction";



export abstract class transactionRepository{

    abstract create(data:Prisma.TransactionUncheckedCreateInput):Promise<defaultTransaction>;

    abstract findOneById(id:string):Promise<Transaction | null>;

    abstract findManyByFilter(query:queryTransaction,acId:string,config:{page:number,pageSize:number}):Promise<Transaction[]>;

    abstract findManyByAccount(acId:string):Promise<Transaction[]>;

    abstract delete(id:string):Promise<defaultTransaction>;

    abstract update(data:Prisma.TransactionUncheckedUpdateInput,id:string):Promise<defaultTransaction>;
    
}