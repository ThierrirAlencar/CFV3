import { PrismaService } from "src/database/prisma.service";
import { goalsRepository } from "../goal.repository";
import { Goal, Prisma } from "generated/prisma";
import { defaultGoal, queryGoal } from "src/interface/defaultGoal";

export class PrismaGoalRepository implements goalsRepository{
    constructor( private prisma:PrismaService){}

    async createGoal(data: Prisma.GoalUncheckedCreateInput): Promise<defaultGoal> {
        const goal = await this.prisma.goal.create({
            data
        })
        return{
            id: goal.id,
            title: goal.title,
            currentValue: goal.currentValue,
            targetValue: goal.targetValue,
            endTime: goal.endTime,
            startDate:goal.createdAt
        }
    }

    async getGoalsFromUser(userId: string): Promise<Goal[]> {
        return this.prisma.goal.findMany({
            where: {
                userId: userId
            }
        });
    }

    async getGoalById(id: string): Promise<Goal | null> {
        return this.prisma.goal.findUnique({
            where: {
                id: id
            }
        });
    }

    async findManyByFilter(query: queryGoal, acId: string, config: { page: number; pageSize: number; }): Promise<Goal[]> {
        const goals = await this.prisma.goal.findMany({
            where: {
                userId: acId,
                title: query.title ? { contains: query.title } : undefined,
                targetValue: {
                    gte: query.targetMinValue ?? 0,
                    lte: query.targetMaxValue ?? Infinity
                },
                createdAt: query.startDate ? { gte: query.startDate } : undefined,
                endTime: query.endTime ? { lte: query.endTime } : undefined
            },
            skip: (config.page - 1) * config.pageSize,
            take: config.pageSize
        })

        return goals;
    }

    async deleteGoal(id: string): Promise<defaultGoal> {
        const {title,createdAt:startDate,currentValue,endTime,targetValue} = await this.prisma.goal.delete({
            where: {
                id: id
            }
        });
        return {
            id: id,
            currentValue,endTime,startDate,title,targetValue
        }
    }

    async updateGoal(id: string, data: Prisma.GoalUncheckedUpdateInput): Promise<defaultGoal | null> {
        const goal = await this.prisma.goal.update({
            where: { id },
            data
        });

        if (!goal) return null;

        return {
            id: goal.id,
            title: goal.title,
            currentValue: goal.currentValue,
            targetValue: goal.targetValue,
            startDate: goal.createdAt,
            endTime: goal.endTime
        };
    }

}