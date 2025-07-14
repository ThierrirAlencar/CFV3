import { Injectable } from "@nestjs/common";
import { EntityDoesNotExistsError } from "src/errors/entityDoesNotExists.error";
import { goalsRepository } from "src/repositories/goal.repository";
import { userRepository } from "src/repositories/user.repository";


interface CreateGoalDTO {
    title: string;
    dueDate?: Date;
    targetValue?: number;
    currentValue?: number;
}


interface UpdateGoalDTO {
    title?: string;
    dueDate?: Date;
    targetValue?: number;
    currentValue?: number;
    completedAt?:Date
}

@Injectable()
export class GoalsService{
    constructor(
        private goalsRepository:goalsRepository,
        private userRepository:userRepository
    ){}

    async create(userId:string,data:CreateGoalDTO){
        const { targetValue, currentValue,dueDate,title} = data;
        const doesTheUserExists = await this.userRepository.findOneById(userId);
        if(!doesTheUserExists){
            throw new EntityDoesNotExistsError("User",userId);
        }

        const goal = await this.goalsRepository.createGoal({
            title,
            userId,
            endTime: dueDate ? new Date(dueDate) : new Date("9999-12-31"),
            targetValue,currentValue
        })

        return {
            id: goal.id,
            title: goal.title,
            dueDate: goal.endTime,
            targetValue: goal.targetValue,
            currentValue: goal.currentValue
        }
    }

    async getGoalsFromUser(userId:string){
        const doesTheUserExists = await this.userRepository.findOneById(userId);
        if(!doesTheUserExists){
            throw new EntityDoesNotExistsError("User",userId);
        }

        return this.goalsRepository.getGoalsFromUser(userId);
    }

    async getGoalById(id: string) {
        const goal = await this.goalsRepository.getGoalById(id);
        if (!goal) {
            throw new EntityDoesNotExistsError("Goal", id);
        }
        return goal;
    }

    async updateGoal(id: string, data: UpdateGoalDTO) {
        const goal = await this.goalsRepository.getGoalById(id);
        if (!goal) {
            throw new EntityDoesNotExistsError("Goal", id);
        }

        const updatedGoal = await this.goalsRepository.updateGoal(id, {
            title: data.title,
            endTime: data.dueDate ? new Date(data.dueDate) : new Date("9999-12-31"),
            targetValue: data.targetValue,
            currentValue: data.currentValue,
            createdAt:data.completedAt
        });

        return updatedGoal;
    }

    async deleteGoal(id: string) {
        const goal = await this.goalsRepository.getGoalById(id);
        if (!goal) {
            throw new EntityDoesNotExistsError("Goal", id);
        }

        return this.goalsRepository.deleteGoal(id);
    }

    async findManyByFilter(query: any, userId: string, config: { page: number; pageSize: number }) {
        const doesTheUserExists = await this.userRepository.findOneById(userId);
        if (!doesTheUserExists) {
            throw new EntityDoesNotExistsError("User", userId);
        }

        return this.goalsRepository.findManyByFilter(query, userId, config);
    }
}