import { Prisma, User } from "generated/prisma";
import { userRepository } from "../user.repository";
import { PrismaService } from "src/database/prisma.service";
import { Injectable } from "@nestjs/common";

@Injectable()
export class prismaUserRepository implements userRepository{

    constructor(private prisma:PrismaService){}

    async create(data: Prisma.UserCreateInput): Promise<{ email: string; username: string; }> {
        const {email,userName:username} = await this.prisma.user.create({
            data,
            select:{
                email:true,userName:true,
            }
        })
        return {
            email,username
        }
    }

    async findOneById(id: string): Promise<User> {
        return await this.prisma.user.findUnique({
            where:{
                id
            }
        })
    }

    
    async findOneByEmail(email: string): Promise<User> {
        return await this.prisma.user.findUnique({
            where:{
                email
            }
        })
    }

    async delete(id: string): Promise<{ email: string; username: string; }> {
        const {email,userName:username} = await this.prisma.user.delete({
            where:{
                id
            },
            select:{
                email:true,userName:true,
            }
        })
        return {
            email,username
        }
    }

    async update(data: Prisma.UserUpdateInput, userId: string): Promise<{ email: string; username: string; }> {
        const {email,userName:username} = await this.prisma.user.update({
            data,
            where:{
                id:userId
            },
            select:{
                email:true,userName:true,
            }
        })
        return {
            email,username
        }
    }
}