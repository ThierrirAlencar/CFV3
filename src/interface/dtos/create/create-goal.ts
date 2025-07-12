import { IsNotEmpty } from "class-validator";

export class createGoalBody {
    @IsNotEmpty()
    title: string;


    @IsNotEmpty()   
    targetDate: Date;

    currentValue?: number;

    targetValue?: number;
}