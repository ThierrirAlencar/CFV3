import { isEmail, isEmpty, IsNotEmpty } from "class-validator";

export class goalUpdateBody {
    
    title?: string;

    targetDate?: Date;

    currentValue?: number;

    targetValue?: number;

    completedAt?:Date
}