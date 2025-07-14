import { AccountType } from "@prisma/client";
import { Type } from "class-transformer";
import { IsEmpty, IsNotEmpty } from "class-validator";


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