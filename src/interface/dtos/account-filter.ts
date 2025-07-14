import { AccountType } from "@prisma/client";
import { Type } from "class-transformer";
import { IsEnum, IsInt, IsOptional, IsString } from "class-validator";


export class AccountFilterParams {
  @IsInt()
  @Type(() => Number)
  page: number;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  pageSize?: number;

  @IsOptional()
  @IsString()
  query?: string;

  @IsOptional()
  @IsEnum(AccountType)
  type?: AccountType;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  minValue?: number;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  maxValue?: number;
}
