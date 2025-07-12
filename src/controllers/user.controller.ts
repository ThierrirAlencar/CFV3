import { Body, Controller, Delete, Get, HttpException, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { CreateUserBody } from 'src/interface/dtos/create-user';
import { EntityAlreadyExists } from 'src/errors/entityAlreadyExists.error';
import { EntityDoesNotExistsError } from 'src/errors/entityDoesNotExists.error';
import { AuthGuard } from 'src/modules/auth/auth.guard';
import { userService } from 'src/services/user/user.service';

@Controller('user')
export class UserController {
    
    constructor(private userService:userService){}

    @Post("/")
    async create(@Body() body: CreateUserBody){
        const {email,password,userName:username,imageUrl:profileUrl} = body;

        try{
            const user = await this.userService.create({
                email,password,profileUrl,username
            })

            return{
                status:HttpStatus.CREATED,
                meta:{
                    name:user.username,
                    email:user.email
                },
                body:{email,password,username,profileUrl},
                date:new Date()
            }
        }catch(err){
            if(err instanceof EntityAlreadyExists){
                throw new HttpException({
                    status:HttpStatus.NOT_FOUND,
                    body:{email,password,username,profileUrl},
                    error:{
                        message:err.message,
                        name:err.name,
                        classtype:"EntityAlreadyExists".toUpperCase()
                    },
                    date:new Date()
                },HttpStatus.NOT_FOUND)
            }else{
                throw new HttpException({
                    status:HttpStatus.INTERNAL_SERVER_ERROR,
                    body:{email,password,username,profileUrl},
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

    @UseGuards(AuthGuard)
    @Get("/")
    async profile(@Request() req){
        const id = req.user.sub;

        try{
            const profile = await this.userService.profile(id)

            return{
                status:HttpStatus.OK,
                meta:profile,
                bearer:req.user,
                date:new Date()
            }

        }catch(err){
            if(err instanceof EntityDoesNotExistsError){
                throw new HttpException({
                    status:HttpStatus.NOT_FOUND,
                    bearer:req.user,
                    error:{
                        message:err.message,
                        name:err.name,
                        classtype:"EntityDoesNotExistsError".toUpperCase()
                    },
                    date:new Date()
                },HttpStatus.NOT_FOUND)
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
                },HttpStatus.NOT_FOUND)
            }
        }
    }

    @UseGuards(AuthGuard)
    @Delete("/")
    async delete(@Request() req){
        const id = req.user.sub;

        try{
            const user = await this.userService.delete(id)

            return{
                status:HttpStatus.OK,
                meta:{username:user.username,email:user.email},
                bearer:req.user,
                date:new Date()
            }
            
        }catch(err){
            if(err instanceof EntityDoesNotExistsError){
                throw new HttpException({
                    status:HttpStatus.NOT_FOUND,
                    bearer:req.user,
                    error:{
                        message:err.message,
                        name:err.name,
                        classtype:"EntityDoesNotExistsError".toUpperCase()
                    },
                    date:new Date()
                },HttpStatus.NOT_FOUND)
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
                },HttpStatus.NOT_FOUND)
            }
        }
    }
}