/** The ${entity} with the ${key} already exists
 * 
 * @param(entity) - The entity refered
 * @param(key) - the key used
 */
export class EntityAlreadyExists extends Error{
    constructor(entity:string,key:string){
        super(`The ${entity} with the ${key} already exists`)
    }
}