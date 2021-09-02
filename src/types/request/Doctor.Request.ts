
/**
 * User objects allow you to associate actions performed in the system with the user that performed them.
 * The User object contains common information across every user in the system regardless of status and role.
 */

export interface SaveReqDoctor{
    name:string,
     /**
   * The name of the doctor used to register his account
   * @example
   */
      
    email:string,
      /**
   * The email the user used to register his account
    * @
   */
      

    phone:string,
      /**
   * The phone number used to register his account
    * @
   */
      
    password:string,
    specialist:string
    avatar?:string
}

export interface UpdateReqDoctor{
   
    name?:string,
    email?:string,
    phone?:string,
    password?:string,
    specialist?:string,
    avatar?:string
}

export interface GetReqDoctor{
    _id:string,

}
// export interface DelReqDoctor{
//     _id:string,
// }

