import { Category, Prisma } from "generated/prisma";
import { DefaultCategory } from "src/interface/defaultCategory";

export abstract class categoryRepository {
    abstract getAllCategories(): Promise<Category[]>;
    
    abstract getCategoryById(id: string): Promise<Category>;
    
    abstract createCategory(categoryData: Prisma.CategoryCreateInput): Promise<DefaultCategory>;
    
    abstract updateCategory(id: string, categoryData: any): Promise<DefaultCategory>;
    
    abstract deleteCategory(id: string): Promise<DefaultCategory>;
}