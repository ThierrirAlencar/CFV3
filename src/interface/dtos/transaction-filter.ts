import { IsEmpty } from "class-validator";
import { Type } from "generated/prisma";

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