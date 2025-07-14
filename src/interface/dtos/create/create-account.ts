import { IsNotEmpty } from "class-validator";
import { AccountType } from "generated/prisma";

export class createAccountBody{

    @IsNotEmpty()
    title:string;
    @IsNotEmpty()
    type:AccountType;
    
    description?:string;
    initialBalace?:number;
}