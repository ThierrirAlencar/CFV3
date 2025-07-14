export class couldNotsendEmailError extends Error{
    constructor(email:string){
        super(`The email could not be sent to:${email}`)
    }
}