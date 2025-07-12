import { AccountType } from "generated/prisma";

export interface accounQuery{
    query?: string;
    type?: AccountType;
    minValue?: number;
    maxValue?: number;
}