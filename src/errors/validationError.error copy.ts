/** Wrong Password
 * 
 */
export class validationError extends Error{
    constructor(){
        super(`Wrong Password`)
    }
}