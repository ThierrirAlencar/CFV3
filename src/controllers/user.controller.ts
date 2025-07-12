import { Body, Controller, HttpException, HttpStatus, Post } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateUserBody } from 'src/dtos/create-user';
import { EntityAlreadyExists } from 'src/errors/entityAlreadyExists.error';
import { userService } from 'src/services/user.service';

@Controller('user')
export class UserController {
    
    constructor(
        private userService:userService
    ){
        
    }

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
}