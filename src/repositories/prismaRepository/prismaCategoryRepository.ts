import { Category, Prisma } from "generated/prisma";
import { DefaultCategory } from "src/interface/defaultCategory";
import { categoryRepository } from "../category.repository";
import { PrismaService } from "src/database/prisma.service";

export class PrismaCategoryRepository implements categoryRepository{
    constructor(private prisma:PrismaService){}
    async createCategory(categoryData: Prisma.CategoryCreateInput): Promise<DefaultCategory> {
        const {iconId:icon ,title} = await this.prisma.category.create({
            data: categoryData,
        });
        
        return{
            icon,title
        }
    }

    async deleteCategory(id: string): Promise<DefaultCategory> {
        return this.prisma.category.delete({
            where: { id },
        }).then(({iconId:icon, title}) => {
            return { icon, title };
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
        const {iconId:icon, title} = await this.prisma.category.update({
            where: { id },
            data: categoryData,
        });
        return {
            icon,
            title
        };
    }
}