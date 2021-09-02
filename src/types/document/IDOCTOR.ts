import {Document} from "mongoose"

export interface IDOCTOR extends Document{
    _id:string,

    name:string,
     /**
   * The email the user used to register his account
   */
    email:string,
    password:string,
    phone:number | string,
    specialist:string,
    patients:object[],
    avatar?:string    
}