import {Schema, model} from "mongoose"
import { ISPECIALIST } from "../types/document/ISPECIALIST"

const ISpecialistSchema = new Schema({
    name:{
        type:String,
        required:[true,"please mention the disease"],
        
        default:"Heart"
    },
    doctor:{
        type:Schema.Types.ObjectId,
        ref:"Doctor"
    }
},{
    timestamps: true
})

export const SpecialistSchema = model<ISPECIALIST>("Specialist",ISpecialistSchema)