import { Module } from "@nestjs/common";
import { goalController } from "src/controllers/goal.controller";
import { PrismaService } from "src/database/prisma.service";
import { goalsRepository } from "src/repositories/goal.repository";
import { PrismaGoalRepository } from "src/repositories/prismaRepository/prismaGoalRepository";
import { prismaUserRepository } from "src/repositories/prismaRepository/prismaUserRepository";
import { userRepository } from "src/repositories/user.repository";
import { GoalsService } from "src/services/goals/goals.service";


@Module({
    imports: [],
    controllers: [goalController],
    providers: [
        {
            provide:goalsRepository,
            useClass:PrismaGoalRepository
        },
        {
            provide:userRepository,
            useClass:prismaUserRepository
        },
        GoalsService,PrismaService
    ],
    exports: [GoalsService]
})
export class goalModule{

}