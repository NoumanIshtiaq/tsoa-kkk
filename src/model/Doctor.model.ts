import {Schema,ObjectId,model, Mongoose} from "mongoose"
import {IDOCTOR} from "../types/document/IDOCTOR"

const IDoctorSchema = new Schema ({
    name:{
        type:String,
        required:[true, "Please Provide the name"],
        maxLength:[25, "name length should of 25 characters long"],

    },
    email:{
        type:String,
        required:[true, "Please Provide the email"],
        unique:true,

    },
    password:{
        type:String,
        required:[true, "Please Provide the password"],
        trim:true,
        minLength:[6,'password must be 6 or more than 6 characters long']
        
    },
    specialist:{
        type:String,
        required:[true,"please mention the disease"],
       
      
    },
    phone:{
        type:String,
        
    },
    avatar:{
        type:String,

    },
    patient:[{
        type: Schema.Types.ObjectId,
        ref:'Patient' 
    }]
},{
    timestamps:true
})

export const DoctorSchema = model<IDOCTOR>('Doctor',IDoctorSchema) 