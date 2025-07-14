import { Category, Prisma } from "generated/prisma";
import { DefaultCategory } from "src/interface/defaultCategory";
import { categoryRepository } from "../category.repository";
import { PrismaService } from "src/database/prisma.service";
import { Inject, Injectable } from "@nestjs/common";

@Injectable()
export class PrismaCategoryRepository implements categoryRepository{
    constructor(private prisma:PrismaService){}
    async createCategory(categoryData: Prisma.CategoryCreateInput): Promise<DefaultCategory> {
        const {iconId,title,isCustom} = categoryData
        console.log({iconId,title,isCustom})
        const {iconId:icon ,title:name,id} = await this.prisma.category.create({
            data: {
                iconId:iconId,
                title:title,
                isCustom:isCustom
            },
        });
        
        return{
            icon,title:name,id
        }
    }

    async deleteCategory(id: string): Promise<DefaultCategory> {
        return this.prisma.category.delete({
            where: { id },
        }).then(({iconId:icon, title,id}) => {
            return { icon, title, id};
        });
    }

    async getAllCategories(): Promise<Category[]> {
        return this.prisma.category.findMany();
    }

    async getCategoryById(id: string): Promise<Category> {
        return this.prisma.category.findUnique({
            where: { id },
        });
    }

    async updateCategory(id: string, categoryData: any): Promise<DefaultCategory> {
        const {iconId:icon, title,id:_id} = await this.prisma.category.update({
            where: { id },
            data: categoryData,
        });
        return {
            icon,
            title,
            id:_id
        };
    }
}