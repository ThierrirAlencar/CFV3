import { Type } from "class-transformer";
import { IsEmpty, IsNotEmpty } from "class-validator";
import { AccountType } from "generated/prisma";

export class accountUpdateBody{
    @IsEmpty()
    @Type(() => String)
    title?: string;

    @IsEmpty()
    @Type(() => String)
    description?: string;

    @IsEmpty()
    type?: AccountType ;

    @IsEmpty()
    @Type(() => Number)
    value?:number;
}