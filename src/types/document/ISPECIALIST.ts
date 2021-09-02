import {Document} from "mongoose"

export interface ISPECIALIST extends Document{
    _id:string,
    name:string,
    doctor:object[]
}