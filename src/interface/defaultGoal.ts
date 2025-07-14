export interface defaultGoal{
    id:string;
    title:String;
    currentValue:Number;
    targetValue:Number;
    startDate:Date;
    endTime:Date;
}

export interface queryGoal{
    title?: string;
    targetMinValue?:number
    targetMaxValue?: number;
    description?: string;
    startDate?: Date;
    endTime?: Date;
}