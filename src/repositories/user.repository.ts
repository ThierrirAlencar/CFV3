import { Prisma, User } from "@prisma/client";


export abstract class userRepository{

    abstract create(data:Prisma.UserCreateInput):Promise<{email:string,username:string}>;

    abstract findOneById(id:string):Promise<User>;

    abstract findOneByEmail(email:string):Promise<User>;

    abstract delete(id:string):Promise<{email:string,username:string}>;

    abstract update(data:Prisma.UserUpdateInput,userId:string):Promise<{email:string,username:string}>;
    
}