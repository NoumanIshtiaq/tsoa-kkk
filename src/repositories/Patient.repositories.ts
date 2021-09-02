import {PatientSchema} from "../model/Patient.model"
import {IPATIENT} from "../types/document/IPATIENT"

export class MainPatient {
    constructor(){}
    getPatient(_id:string){
        return PatientSchema.findById(_id).select('-password').populate('doctor',("-patient -password"))
    }
    savePatient(patient: IPATIENT){
        return new PatientSchema(patient).save()
    }
    updatePatient(patient: IPATIENT){
        return PatientSchema.findByIdAndUpdate(patient._id,patient,{
            new:true
        })
    }
    delPatient(_id:string){
        return PatientSchema.findByIdAndDelete(_id)
    }
    reportPatient(_id:string){
        return PatientSchema.findById(_id).select('avatar -_id')
    }
    reportuploadpatient(id:any ,report:any){
        return PatientSchema.findByIdAndUpdate(id,report,{
            new:true
        })
    }
}