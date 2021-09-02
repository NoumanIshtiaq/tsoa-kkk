import {IPATIENT} from "../types/document/IPATIENT"
import {SaveReqPatient,UpdateReqPatient,DelReqPatient,GetReqPatient} from "../types/request/Patient.Request"
import {SaveUpdateResPatient} from "../types/response/Patient.Response"
import CustomeError from "../utils/error"
import {MainPatient} from "../repositories/Patient.repositories"
import {Get,Post,Put,Delete,SuccessResponse,Path,Route,Tags,Body,Security, FormField,UploadedFile, Query} from "tsoa"

@Route('patient')
@Tags('patient')

export class PatientController {
    constructor(){}

@Security("api_key")
@Post("/getpatient")
async getpatient(@Body() getreq:GetReqPatient): Promise<SaveUpdateResPatient>{
    const patient:any = await new MainPatient().getPatient(getreq._id);
    if(patient === null) throw new CustomeError(404 , "Patient Not Found")
    return <SaveUpdateResPatient>patient;
}
/**
 * @summary Save the patient
 * @param avatar upload image of jpeg and png format 
 * @param name write the name of the patient
 * @param email provide the correct email to receive report
 * @param password just in case if we enhance the capability
 * @param phone provide non- converted number
 * @param disease disease you know why you come here
 * @param doctor we will provide you this
 * @returns application/xml
 */


@Post("/savepatient")
async savepatient(
@UploadedFile() avatar:any,
@FormField() name:SaveReqPatient,
@FormField() email:SaveReqPatient,
@FormField() password:SaveReqPatient,
@FormField() phone:SaveReqPatient,
@FormField() disease:SaveReqPatient,
@FormField() doctor?:SaveReqPatient):Promise<SaveUpdateResPatient>{
    let savereq:any ={
        name,email,password,phone,disease,doctor,avatar
    }
   

    const newpatient: IPATIENT = await new MainPatient().savePatient(<IPATIENT> savereq)
    
    return <SaveUpdateResPatient> <any> newpatient;
}
@Security("api_key")
@Delete("/deletepatient")
@SuccessResponse("200","patient deleted")
async deletepatient(@Body() delreq: DelReqPatient){
    await new MainPatient().delPatient(delreq._id)
}
/**
 * 
 * @param updatereq request part
 * @example update
 * @returns 
 */
@Security("api_key")
@Put("/updatepatient")
async updatepatient(@Body() updatereq:UpdateReqPatient):Promise <SaveUpdateResPatient>{
    const updatepatient: any = await new MainPatient().updatePatient(<IPATIENT> updatereq)
    if(updatepatient === null) throw new CustomeError(400, "Not supported")
    return <SaveUpdateResPatient> <any> updatepatient
}
@Get("/reportpatient")
async reportpatient(@Query() id:any):Promise <SaveUpdateResPatient>{
 
    const reportpatient:any = await new MainPatient().reportPatient(<any>id)
   
    if(reportpatient === null) throw new CustomeError(400, "Not Found call your doc")
    return <any> reportpatient
}
@Post("/uploadreportpatient")
async uploadrtpatient(@FormField() id:any, @UploadedFile() Report:any):Promise <SaveUpdateResPatient>{
    const report:any = await new MainPatient().reportuploadpatient(id,Report)
    return <any> report
}
}
