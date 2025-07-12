import { Module } from "@nestjs/common";
import { CategoryController } from "src/controllers/category.controller";
import { PrismaService } from "src/database/prisma.service";
import { categoryRepository } from "src/repositories/category.repository";
import { PrismaCategoryRepository } from "src/repositories/prismaRepository/prismaCategoryRepository";
import { categoryService } from "src/services/category/category.service";



@Module({
    imports: [],
    controllers: [CategoryController],
    providers: [
        {
            provide: categoryRepository,
            useClass: PrismaCategoryRepository
        },
        categoryService,PrismaService
    ],
    exports: [categoryService]
})
export class CategoryModule{

}