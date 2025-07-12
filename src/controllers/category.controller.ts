import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put } from "@nestjs/common";
import { createCategoryBody } from "src/interface/dtos/create-category";
import { categoryService } from "src/services/category/category.service";

@Controller("category")
export class CategoryController {
  // Implement category-related endpoints here
    constructor(
        private categoryService:categoryService
    ){}

    @Post("")
    async createCategory(@Body() createCategoryDto:createCategoryBody){
        const { name, iconId, isCustom } = createCategoryDto;

        try{
            const data = await this.categoryService.createCategory(name, iconId, isCustom);
            
            return {
                status:HttpStatus.CREATED,
                data,
                body:createCategoryDto,
                date:new Date().toISOString()
            }
        }catch(err){
            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: "Failed to create category",
                message: err.message
            },HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }


    @Get("/:id")
    async getCategoryById(@Param("id") id: string) {
        try {
            const category = await this.categoryService.findCategoryById(id);
            if (!category) {
                throw new HttpException({
                    status: HttpStatus.NOT_FOUND,
                    error: "Category not found"
                }, HttpStatus.NOT_FOUND);
            }
            return {
                status: HttpStatus.OK,
                data: category,
                date: new Date().toISOString()
            };
        } catch (err) {
            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: "Failed to retrieve category",
                message: err.message
            }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @Get("/all")
    async getAllCategories(){
        try{
            const categories = await this.categoryService.getAllCategories();
            return {
                status: HttpStatus.OK,
                data: categories,
                date: new Date().toISOString()
            }
        }catch(err){
            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: "Failed to retrieve categories",
                message: err.message
            },HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    @Delete("/:id")
    async deleteCategory(@Param("id") id:string){
        try{
            const deletedCategory = await this.categoryService.deleteCategory(id);
            if(!deletedCategory){
                throw new HttpException({
                    status: HttpStatus.NOT_FOUND,
                    error: "Category not found"
                },HttpStatus.NOT_FOUND)
            }
            return {
                status: HttpStatus.OK,
                data: deletedCategory,
                date: new Date().toISOString()
            }
        }catch(err){
            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: "Failed to delete category",
                message: err.message
            },HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    @Put("/:id")
    async updateCategory(
        @Param("id") id: string,
        @Body() updateCategoryDto: createCategoryBody
    ) {
        const { name, iconId, isCustom } = updateCategoryDto;

        try {
            const updatedCategory = await this.categoryService.updateCategory(id, name, iconId, isCustom);
            if (!updatedCategory) {
                throw new HttpException({
                    status: HttpStatus.NOT_FOUND,
                    error: "Category not found"
                }, HttpStatus.NOT_FOUND);
            }
            return {
                status: HttpStatus.OK,
                data: updatedCategory,
                date: new Date().toISOString()
            };
        } catch (err) {
            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: "Failed to update category",
                message: err.message
            }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }   
}