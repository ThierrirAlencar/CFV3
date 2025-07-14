import { AccountType } from "@prisma/client";
import { IsNotEmpty } from "class-validator";


export class createAccountBody{

    @IsNotEmpty()
    title:string;
    @IsNotEmpty()
    type:AccountType;
    
    description?:string;
    initialBalace?:number;
}