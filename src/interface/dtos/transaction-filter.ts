import { Type } from "@prisma/client";
import { IsEmpty } from "class-validator";


export class transactionFilterBody{

    
    categoryId?: string;
    title?: string;
    type?: Type;
    minValue?: number;
    maxValue?: number;
    createdBefore?: Date;
    createdAfter?: Date;

    page:number; //Only param that is not optional
    accountId: string;

    
    pageSize?:number;
}