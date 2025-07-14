import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, Query, Req, Request, UseGuards } from "@nestjs/common";
import { first } from "rxjs";
import { EntityDoesNotExistsError } from "src/errors/entityDoesNotExists.error";
import { queryTransaction } from "src/interface/defaultTransaction";
import { createAccountBody } from "src/interface/dtos/create/create-account";
import { createTransactionBody } from "src/interface/dtos/create/create-transaction";
import { transactionFilterBody } from "src/interface/dtos/transaction-filter";
import { AuthGuard } from "src/modules/auth/auth.guard";
import { authService } from "src/services/auth/auth.service";
import { transactionService } from "src/services/transactions/transaction.service";

@Controller("transaction")
export class TransactionController {
  // This controller will handle transaction-related endpoints
  // Methods for handling transactions will be added here in the future
    private baseUrl = `http://${process.env.API_HOST}:${process.env.API_PORT}/transaction`; 
    constructor(
        private transactionService:transactionService,
    ){}

    @Post("/")
    async createTransaction(@Body() body:createTransactionBody) {
        const { accountId, categoryId, title, type, value } = body;
        try{
            const data = await this.transactionService.create({
                accountId,categoryId,title,type,value
            })

            return{
                status:HttpStatus.OK,
                data,
                date:new Date(),
                body,
            }
        }catch(err){
            if(err instanceof EntityDoesNotExistsError) {
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
                    status: HttpStatus.INTERNAL_SERVER_ERROR,
                    body,
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
    async updateTransaction(@Param("id") id:string, @Body() body:Partial<createTransactionBody>) {
        const { accountId, categoryId, title, type, value } = body;
        try{
            const data = await this.transactionService.update(id,{
                accountId,categoryId,title,type,value
            })

            return{
                status:HttpStatus.OK,
                data,
                date:new Date(),
                body,
            }
        }catch(err){
            if(err instanceof EntityDoesNotExistsError) {
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
                    status: HttpStatus.INTERNAL_SERVER_ERROR,
                    body,
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
    async deleteTransaction(@Param("id") id:string) {
        try{
            const data = await this.transactionService.delete(id);

            return{
                status:HttpStatus.OK,
                data,
                date:new Date(),
            }
        }catch(err){
            if(err instanceof EntityDoesNotExistsError) {
                throw new HttpException({
                    status: HttpStatus.NOT_FOUND,
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
    async findManyByFilter(@Query() query:transactionFilterBody,@Request() req){
        const {accountId,categoryId,createdAfter,createdBefore,maxValue,minValue,page,pageSize,title,type} = query
        const id = req.user.sub; 
        try{
            const data = await this.transactionService.findManyByFilter({
                categoryId,createdAfter,createdBefore,maxValue,minValue,title,type
            },id,Number(page),Number(pageSize));

            return {
                status: HttpStatus.OK,
                data:{
                    transactions:data.transactions,
                    resume:data.data.resume
                },
                meta:{
                    maxPage: Math.ceil(data.meta.sizeList / pageSize),
                    page: Number(page),
                    pageSize: Number(pageSize),
                    totalCount: data.meta.sizeList,
                    links:{
                        first:`${this.baseUrl}?page=1&pageSize=${pageSize}`,
                        last:`${this.baseUrl}?page=${Math.ceil(data.meta.sizeList / pageSize)}&pageSize=${pageSize}`,
                        next: page < Math.ceil(data.meta.sizeList / pageSize) ? `${this.baseUrl}?page=${Number(page) + 1}&pageSize=${pageSize}` : null,
                        prev: page > 1 ? `${this.baseUrl}?page=${Number(page) - 1}&pageSize=${pageSize}` : null,
                    }
                },
                date: new Date(),
                links:{
                    first:`${this.baseUrl}?page=1&pageSize=${pageSize}`,
                    last:`${this.baseUrl}?page=${Math.ceil(data.meta.sizeList / pageSize)}&pageSize=${pageSize}`,
                    next: page < Math.ceil(data.meta.sizeList / pageSize) ? `${this.baseUrl}?page=${page + 1}&pageSize=${pageSize}` : null,
                    prev: page > 1 ? `${this.baseUrl}?page=${page - 1}&pageSize=${pageSize}` : null,
                },
                body: query,
            };

        }catch(err){
            if(err instanceof EntityDoesNotExistsError) {
                throw new HttpException({
                    status: HttpStatus.NOT_FOUND,
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