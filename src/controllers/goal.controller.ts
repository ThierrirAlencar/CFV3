import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, Req, UseGuards } from "@nestjs/common";
import { stat } from "fs";
import { EntityDoesNotExistsError } from "src/errors/entityDoesNotExists.error";
import { createGoalBody } from "src/interface/dtos/create/create-goal";
import { goalUpdateBody } from "src/interface/dtos/update/goal-update";
import { AuthGuard } from "src/modules/auth/auth.guard";
import { GoalsService } from "src/services/goals/goals.service";

@Controller('goal')
export class goalController {
    constructor(
        private goalService:GoalsService
    ){

    }
    
    @UseGuards(AuthGuard)
    @Post("")
    async createGoal(@Body() body:createGoalBody,@Req() req){
        const { title, targetDate:dueDate, currentValue, targetValue } = body;
        const userId = req.user.id; 

        try{
            const goal = await this.goalService.create(userId,{
                title,
                currentValue,
                dueDate:new Date(dueDate),
                targetValue:targetValue
            })

            return{
                status:HttpStatus.CREATED,
                data:goal,
                date:new Date().toISOString(),
                body:{
                    title,
                    currentValue,
                    dueDate,
                    targetValue
                }
            }
        }catch(err){
            if(err instanceof EntityDoesNotExistsError){
                throw new HttpException({
                    status: HttpStatus.NOT_FOUND,
                    body,
                    error: {
                        message: err.message,
                        name: err.name,
                        classtype: "EntityDoesNotExistsError".toUpperCase()
                    },
                    date: new Date()
                }, HttpStatus.NOT_FOUND);
            }else{
                throw new HttpException({
                    status:HttpStatus.INTERNAL_SERVER_ERROR,
                    bearer:req.user,
                    error:{
                        message:err.message,
                        name:err.name,
                        classtype:"INTERNAL_SERVER_ERROR",
                        class:String(err)
                    },
                    date:new Date()
                },HttpStatus.INTERNAL_SERVER_ERROR)
            }
        }
    }

    @Delete("/:id")
    async deleteGoal(@Param("id") id:string){
        try{
            const goal = await this.goalService.deleteGoal(id);

            return{
                status:HttpStatus.OK,
                data:goal,
                params:{
                    id
                },
                date:new Date()
            }
        }catch(err){
            if(err instanceof EntityDoesNotExistsError){
                throw new HttpException({
                    status: HttpStatus.NOT_FOUND,
                    params:{
                        id
                    },
                    error: {
                        message: err.message,
                        name: err.name,
                        classtype: "EntityDoesNotExistsError".toUpperCase()
                    },
                    date: new Date()
                }, HttpStatus.NOT_FOUND);
            }else{
                throw new HttpException({
                    status:HttpStatus.INTERNAL_SERVER_ERROR,
                    params:{
                        id
                    },
                    error:{
                        message:err.message,
                        name:err.name,
                        classtype:"INTERNAL_SERVER_ERROR",
                        class:String(err)
                    },
                    date:new Date()
                },HttpStatus.NOT_FOUND)
            }
        }
    }

    @Get("/:id")
    async getSingleGoal(@Param("id") id:string){
        try{
            const goal = await this.goalService.getGoalById(id);

            return{
                status:HttpStatus.OK,
                data:goal,
                params:{
                    id
                },
                date:new Date()
            }
        }catch(err){
            if(err instanceof EntityDoesNotExistsError){
                throw new HttpException({
                    status: HttpStatus.NOT_FOUND,
                    params:{
                        id
                    },
                    error: {
                        message: err.message,
                        name: err.name,
                        classtype: "EntityDoesNotExistsError".toUpperCase()
                    },
                    date: new Date()
                }, HttpStatus.NOT_FOUND);
            }else{
                throw new HttpException({
                    status:HttpStatus.INTERNAL_SERVER_ERROR,
                    params:{
                        id
                    },
                    error:{
                        message:err.message,
                        name:err.name,
                        classtype:"INTERNAL_SERVER_ERROR",
                        class:String(err)
                    },
                    date:new Date()
                },HttpStatus.NOT_FOUND)
            }
        }
    }

    @Put("/:id")
    async updateGoal(@Param("id") id:string, @Body() body:goalUpdateBody){
        const {completedAt,currentValue,targetDate:dueDate,targetValue,title} = body
    
        try{
            const goal = await this.goalService.updateGoal(id,{
                title,currentValue,dueDate,targetValue,completedAt
            })

            return{
                status:HttpStatus.CREATED,
                body,
                data:goal,
                date:new Date()
            }
        }catch(err){
            if(err instanceof EntityDoesNotExistsError){
                throw new HttpException({
                    status: HttpStatus.NOT_FOUND,
                    body,
                    params:{
                        id
                    },
                    error: {
                        message: err.message,
                        name: err.name,
                        classtype: "EntityDoesNotExistsError".toUpperCase()
                    },
                    date: new Date()
                }, HttpStatus.NOT_FOUND);
            }else{
                throw new HttpException({
                    status:HttpStatus.INTERNAL_SERVER_ERROR,
                    body,
                    params:{
                        id
                    },
                    error:{
                        message:err.message,
                        name:err.name,
                        classtype:"INTERNAL_SERVER_ERROR",
                        class:String(err)
                    },
                    date:new Date()
                },HttpStatus.NOT_FOUND)
            }
        }
    }

    @Put("/complete/:id")
    async markGoalAsCompleted(@Param("id") id:string){
        
    
        try{
            const goal = await this.goalService.updateGoal(id,{
                completedAt:new Date(),
            })

            return{
                status:HttpStatus.CREATED,
                param:{
                    id
                },
                data:goal,
                date:new Date()
            }
        }catch(err){
            if(err instanceof EntityDoesNotExistsError){
                throw new HttpException({
                    status: HttpStatus.NOT_FOUND,
                    params:{
                        id
                    },
                    error: {
                        message: err.message,
                        name: err.name,
                        classtype: "EntityDoesNotExistsError".toUpperCase()
                    },
                    date: new Date()
                }, HttpStatus.NOT_FOUND);
            }else{
                throw new HttpException({
                    status:HttpStatus.INTERNAL_SERVER_ERROR,
                    params:{
                        id
                    },
                    error:{
                        message:err.message,
                        name:err.name,
                        classtype:"INTERNAL_SERVER_ERROR",
                        class:String(err)
                    },
                    date:new Date()
                },HttpStatus.NOT_FOUND)
            }
        }
    }
}   