import { IsEmail, isNotEmpty, IsNotEmpty, Length } from "class-validator"

//Inclui as validações de classe do class-validator
export class CreateUserBody{

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

    @IsNotEmpty({
        message:"The userName is required"
    })
    userName:     string

    imageUrl?:    string
}
