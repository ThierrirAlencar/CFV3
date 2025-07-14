
import { Goal, Prisma } from "@prisma/client";
import { defaultGoal, queryGoal } from "src/interface/defaultGoal";

export abstract class goalsRepository{
    abstract createGoal(data: Prisma.GoalUncheckedCreateInput): Promise<defaultGoal>;
    abstract getGoalsFromUser(userId:string): Promise<Goal[]>;
    abstract getGoalById(id: string): Promise<Goal | null>;
    abstract findManyByFilter(query:queryGoal,acId:string,config:{page:number,pageSize:number}):Promise<Goal[]>;
    abstract updateGoal(id: string, data: Prisma.GoalUncheckedUpdateInput): Promise<defaultGoal | null>;
    abstract deleteGoal(id: string): Promise<defaultGoal>;
}