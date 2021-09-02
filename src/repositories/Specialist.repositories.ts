import {SpecialistSchema} from "../model/Specialist.model"
import {ISPECIALIST} from "../types/document/ISPECIALIST"

export class MainDoctor {
    constructor(){}
    getDisease(_id:string){
        return SpecialistSchema.findById(_id)
    }
    saveDisease(specialist: ISPECIALIST){
        return new SpecialistSchema(specialist).save()
    }
    updateDisease(specialist: ISPECIALIST){
        return SpecialistSchema.findByIdAndUpdate(specialist._id, specialist ,{
            new:true
        })
    }
    delDisease(_id:string){
        return SpecialistSchema.findByIdAndDelete(_id)
    }
    
}