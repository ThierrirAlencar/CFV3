import { IsEmail, IsNotEmpty, Length } from "class-validator"

export class loginUserBody {
    
    @IsEmail()
    @IsNotEmpty({
        message:"The email is required"
    })
    email:        string
    
    @IsNotEmpty({
        message:"The password is required"
    })
    @Length(6,16,{
        message:"The password must contain at least 6 characters and less than 16"
    })
    password:        string
}