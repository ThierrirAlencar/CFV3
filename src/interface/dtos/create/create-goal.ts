import { IsNotEmpty } from "class-validator";

export class createGoalBody {
    @IsNotEmpty()
    title: string;


    @IsNotEmpty()   
    targetDate: string;

    currentValue?: number;

    targetValue?: number;
}