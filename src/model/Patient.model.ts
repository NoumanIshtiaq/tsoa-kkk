import {Schema,model} from "mongoose"
import {IPATIENT} from "../types/document/IPATIENT"

const IPatientSchema = new Schema({
    name:{
        type:String,
        maxLength:[25,"Name must not be more than 25 characters long"],
        required:[true, "please provide the name"]
    },
    email:{
        type:String,
        required:[true,"Please provide the email"],
        unique:true
    },
    phone:{
        type:String,
        unique:true,
        

    },
    password:{
        type:String,
        required:[true,"plaease provide the password"],
        minLength:[6,"password must be more than 6 characters long"]
    },
    disease:{
        type:Array,
        required:[true,"please mention the disease"],
        
        default:"Heart"
    },
    avatar:{
        type:String,

    },
    doctor:[{
        type:Schema.Types.ObjectId,
        ref:'Doctor'
    }]
},{
    timestamps:true
})

export const PatientSchema = model<IPATIENT>("Patient", IPatientSchema)