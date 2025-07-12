import { IsNotEmpty } from "class-validator"
import { Type } from "generated/prisma"

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
