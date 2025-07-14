import { Account, Prisma, User } from "generated/prisma";
import { accounQuery } from "src/interface/account-query";
import { defaultAccount } from "src/interface/deafultAccount";



export abstract class accountRepository{

    abstract create(data:Prisma.AccountUncheckedCreateInput):Promise<defaultAccount>;

    abstract findOneById(id:string):Promise<Account | null>;

    abstract findManyByFilter(query:accounQuery,uid:string,config:{page:number,pageSize:number}):Promise<{paginated:Account[],total:Account[]}>;

    abstract findManyByUserl(uid:string):Promise<Account[]>;

    abstract delete(id:string):Promise<defaultAccount>;

    abstract update(data:Prisma.AccountUncheckedUpdateInput,id:string):Promise<defaultAccount>;
    
}