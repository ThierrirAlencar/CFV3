import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Patch, Post, Put, Query, Request, UseGuards } from "@nestjs/common";
import { get } from "http";
import { EntityDoesNotExistsError } from "src/errors/entityDoesNotExists.error";
import { accounQuery } from "src/interface/account-query";
import { AccountFilterParams } from "src/interface/dtos/account-filter";
import { accountUpdateBody } from "src/interface/dtos/account-update.";
import { createAccountBody } from "src/interface/dtos/create-account";
import { AuthGuard } from "src/modules/auth/auth.guard";
import { accountService } from "src/services/accounts/account.service";

@Controller("account")
export class AccountController {
    constructor(private accountService: accountService) {} 


    @UseGuards(AuthGuard)
    @Post("/")
    async create(@Request() req, @Body() body: createAccountBody) {
        const userId = req.user.sub

        const {title,type,description,initialBalace:value} = body;

        try{
            console.log("Creating account for user:", userId, "with data:", body);
            const account = await this.accountService.create(userId,{
                title,type,description,value
            });

            return {
                status: 201,
                body: {
                    title,type,description,initialBalace:value
                },
                meta:{
                    description:account.description,
                    title:account.title,
                },
                date: new Date()
            }
        }catch(err){
            if(err instanceof EntityDoesNotExistsError) {
                throw new HttpException({
                    status: HttpStatus.NOT_FOUND,
                    body: { title, type, description, initialBalace: value },
                    error: {
                        message: err.message,
                        name: err.name,
                        classtype: "EntityDoesNotExistsError".toUpperCase()
                    },
                    date: new Date()
                }, HttpStatus.NOT_FOUND);
            }else{
                throw new HttpException({
                    status: HttpStatus.INTERNAL_SERVER_ERROR,
                    body: { title, type, description, initialBalace: value },
                    error: {
                        message: err.message,
                        name: err.name,
                        classtype: 'INTERNAL_SERVER_ERROR',
                        class: String(err),
                    },
                    date: new Date(),
                }, HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
    }

    @UseGuards(AuthGuard)
    @Get("/")
    async listWithFilters(@Request() req,@Query() params:AccountFilterParams) {
        const userId = req.user.sub;
        const {maxValue,minValue,query,type,page,pageSize} = params;
        try{
            const accounts = await this.accountService.findManyByFilter({
                query,
                type,
                minValue,
                maxValue
            },userId,page,pageSize);

            return {
                status: 200,
                params: params,
                meta:accounts,
                date: new Date()
            }
        }catch(err){
            if(err instanceof EntityDoesNotExistsError) {
                throw new HttpException({
                    status: HttpStatus.NOT_FOUND,
                    params: params,
                    error: {
                        message: err.message,
                        name: err.name,
                        classtype: "EntityDoesNotExistsError".toUpperCase()
                    },
                    date: new Date()
                }, HttpStatus.NOT_FOUND);
            }else{
                throw new HttpException({
                    status: HttpStatus.INTERNAL_SERVER_ERROR,
                    params: params,
                    error: {
                        message: err.message,
                        name: err.name,
                        classtype: 'INTERNAL_SERVER_ERROR',
                        class: String(err),
                    },
                    date: new Date(),
                }, HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
    }

    @Delete("/:id")
    async delete(@Param("id") id: string) {
        
        try{
            const account = await this.accountService.delete(id);

            return{
                status:HttpStatus.OK,
                params: { id },
                meta:account,
                date: new Date()
            }

        }catch(err){
            if(err instanceof EntityDoesNotExistsError) {
                throw new HttpException({
                    status: HttpStatus.NOT_FOUND,
                    params: { id },
                    error: {
                        message: err.message,
                        name: err.name,
                        classtype: "EntityDoesNotExistsError".toUpperCase()
                    },
                    date: new Date()
                }, HttpStatus.NOT_FOUND);
            }else{
                throw new HttpException({
                    status: HttpStatus.INTERNAL_SERVER_ERROR,
                    params: { id },
                    error: {
                        message: err.message,
                        name: err.name,
                        classtype: 'INTERNAL_SERVER_ERROR',
                        class: String(err),
                    },
                    date: new Date(),
                }, HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
    }

    @Put("/:id")
    async update(@Param("id") id: string, @Body() body:accountUpdateBody) {
        const {title,type,description,value} = body;

        try{
            const account = await this.accountService.update(id,{
                title,type,description,value
            });

            return {
                status: 200,
                params: { id },
                body: {
                    title,type,description,value
                },
                meta:{
                    description:account.description,
                    title:account.title,
                },
                date: new Date()
            }
        }catch(err){
            if(err instanceof EntityDoesNotExistsError) {
                throw new HttpException({
                    status: HttpStatus.NOT_FOUND,
                    params: { id },
                    body: { title, type, description, value },
                    error: {
                        message: err.message,
                        name: err.name,
                        classtype: "EntityDoesNotExistsError".toUpperCase()
                    },
                    date: new Date()
                }, HttpStatus.NOT_FOUND);
            }else{
                throw new HttpException({
                    status: HttpStatus.INTERNAL_SERVER_ERROR,
                    params: { id },
                    body: { title, type, description, value },
                    error: {
                        message: err.message,
                        name: err.name,
                        classtype: 'INTERNAL_SERVER_ERROR',
                        class: String(err),
                    },
                    date: new Date(),
                }, HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
    }
}