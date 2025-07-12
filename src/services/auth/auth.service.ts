import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { compareSync } from "bcryptjs";
import { EntityDoesNotExistsError } from "src/errors/entityDoesNotExists.error";
import { validationError } from "src/errors/validationError.error copy";
import { userRepository } from "src/repositories/user.repository";


@Injectable()
export class authService{
    constructor(
        private userRepository:userRepository,
        private jwtService:JwtService
    ){}


    async login(email:string,password:string):Promise<{access_token:string}>{
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

        //Creates a payload (where we should store the information for the JWT)
        const payload = {sub:user.id}

        //In signAsAsync we turn our payload into an jwt string
        return {
            access_token: await this.jwtService.signAsync(payload)
        }
    }
}