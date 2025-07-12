import { IsEmpty } from "class-validator";
import { Type } from "generated/prisma";

export class transactionFilterBody{

    @IsEmpty()
    categoryId?: string;
    @IsEmpty()
    title?: string;
    @IsEmpty()
    type?: Type;
    @IsEmpty()
    minValue?: number;
    @IsEmpty()
    maxValue?: number;
    @IsEmpty()
    createdBefore?: Date;
    @IsEmpty()
    createdAfter?: Date;

    page:number; //Only param that is not optional
    accountId: string;

    
    @IsEmpty()
    pageSize?:number;
}