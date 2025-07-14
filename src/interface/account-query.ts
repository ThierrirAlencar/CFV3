import { AccountType } from "@prisma/client";


export interface accounQuery{
    query?: string;
    type?: AccountType;
    minValue?: number;
    maxValue?: number;
}