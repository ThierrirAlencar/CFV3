import { Injectable } from "@nestjs/common";
import { compareSync, hash } from "bcryptjs";
import { EntityAlreadyExists } from "src/errors/entityAlreadyExists.error";
import { EntityDoesNotExistsError } from "src/errors/entityDoesNotExists.error";
import { validationError } from "src/errors/validationError.error copy";
import { userRepository } from "src/repositories/user.repository";

interface defaultReturn{
    email:string,
    username:string
}

@Injectable()
export class userService {
    constructor(private userRepository:userRepository){}

    async create(data:{email:string,password:string,username:string,profileUrl:string}):Promise<defaultReturn>{
        const {email,password,profileUrl,username} = data
        const doesTheUserAlreadyExsists = await this.userRepository.findOneByEmail(email)

        //Check if the user with this email adress already exists
        if(doesTheUserAlreadyExsists){
            throw new EntityAlreadyExists("user",email)
        }
        //create a secure password for the user by hashing it
        const securePassword = await hash(password,9)

        //if there's no user with that email adress
        const user = await this.userRepository.create({
            email,password:securePassword,userName:username,imageUrl:profileUrl
        })

        return{
            email:user.email,username:user.username
        }
    }

    async profile(id:string):Promise<defaultReturn>{   
        const doesTheUserExists = await this.userRepository.findOneById(id)

        //Check if an user with this id exists
        if(!doesTheUserExists){
            throw new EntityDoesNotExistsError("user",id)
        }
        
        //Returns it
        const {email,userName:username} = doesTheUserExists

        return {email,username}
    }   

    async login(email:string,password:string):Promise<{id:string}>{
        const user = await this.userRepository.findOneByEmail(email)

        //Checks if the entity with this email adress really exists
        if(!user){
            throw new EntityDoesNotExistsError("user",email)
        }
    
        //Compare the password to check if it is right
        const doesThePasswordIsRight = compareSync(password,user.password)

        //Throws an error if the password is wrong
        if(!doesThePasswordIsRight){
            throw new validationError()
        }

        return {
            id:user.id
        }
    }

    async delete(id:string):Promise<defaultReturn>{
        
        const doesTheUserExists = await this.userRepository.findOneById(id)

        //Checks if the user with this id really exists
        if(!doesTheUserExists){
            throw new EntityDoesNotExistsError("user",id)
        }

        //Deletes this user
        const user = await this.userRepository.delete(id);

        return user
    }


}