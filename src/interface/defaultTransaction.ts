import { Type } from "generated/prisma/client";

export interface defaultTransaction {
    title:string;
    value:number;
    type: Type;
    createdAt:Date;
}

export interface queryTransaction{
    title?:string;
    minValue?:number;
    maxValue?:number;
    type?: Type;
    createdBefore?:Date;
    createdAfter?:Date;
}