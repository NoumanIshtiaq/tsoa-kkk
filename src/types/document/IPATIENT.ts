import {Document} from "mongoose"

export interface IPATIENT extends Document {
    _id:string,
    name:string,
    email:string,
    phone:string | number,
    password:string,
    disease:string[],
    avatar?:string,
    doctor:object[]
}