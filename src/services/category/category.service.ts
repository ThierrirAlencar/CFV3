import { Injectable } from "@nestjs/common";
import { categoryRepository } from "src/repositories/category.repository";


@Injectable()
export class categoryService{
    getAllCategories() {
        throw new Error("Method not implemented.");
    }
    constructor(
        private categoryRepository: categoryRepository
    ){}

    async findAllCategories(){
        return await this.categoryRepository.getAllCategories();
    }

    async findCategoryById(id: string){
        return await this.categoryRepository.getCategoryById(id);
    }

    async createCategory(name:string,icon:string,isCustom:boolean = false){
        return await this.categoryRepository.createCategory({
            title:name,
            iconId:icon,isCustom
        })
    }

    async updateCategory(id:string,name:string,icon:string,isCustom:boolean = false){
        return await this.categoryRepository.updateCategory(id,{
            title:name,
            iconId:icon,isCustom
        });
    }

    async deleteCategory(id:string){
        return await this.categoryRepository.deleteCategory(id);
    }
}