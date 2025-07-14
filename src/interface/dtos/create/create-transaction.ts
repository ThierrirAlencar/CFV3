import { Type } from "@prisma/client"
import { IsNotEmpty } from "class-validator"


export class createTransactionBody{
    @IsNotEmpty()
    accountId:string
    @IsNotEmpty()
    categoryId:string
    @IsNotEmpty()
    title:string
    @IsNotEmpty()
    type:Type
    @IsNotEmpty()
    value:number
}
