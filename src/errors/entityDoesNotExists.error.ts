/** The ${entity} with the ${key} does not exists
 * 
 * @param(entity) - The entity refered
 * @param(key) - the key used
 */
export class EntityDoesNotExistsError extends Error{
    constructor(entity:string,key:string){
        super(`The ${entity} with the ${key} does not exists`)
    }
}