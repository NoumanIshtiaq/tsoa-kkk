import {IDOCTOR} from "../types/document/IDOCTOR"
import {SaveReqDoctor,GetReqDoctor,UpdateReqDoctor} from "../types/request/Doctor.Request"
import {SaveUpdateResDoctor} from "../types/response/Doctor.Response"
import {MainDoctor} from "../repositories/Doctor.repositories"
import CustomeError from  "../utils/error"
import {Get,Patch,Post,Path,Put,Example,Body,Query,SuccessResponse,Delete,Route,Tags,Security,Deprecated,Hidden,Request} from "tsoa"
import { request } from "http"

@Route('doctor')
@Tags('doctor')

export class DoctorController {
    constructor(){}
/**
 * description The route is for get the specific  doctor information 
 * @summary Get Doctor Info
 * @param getreq The user id 
 * 
 * 
 * @returns 
 * 
 */
    @Security("jwt")
    @Post("/getdoctor")
    async getdoctor(
    
    @Request() request:any 
    ): Promise<SaveUpdateResDoctor>{
    
        const doctor:any = await new MainDoctor().getDoctor(<any>request);
        
        if(doctor === null) throw new CustomeError(404 , "Doctor Not Found")
        return <SaveUpdateResDoctor>doctor;
    }
    @Security("api_key")
    @Get('/getalldoctor')
    async getallDoctor(): Promise<SaveUpdateResDoctor[]>{
        console.log('ctrl1')
        const doctor: IDOCTOR[] = await new MainDoctor().getalldoctor().select('-password').populate("patient")
        console.log('ctrl2')
        return <SaveUpdateResDoctor[]>doctor
    }

    @Post("/savedoctor")
   
    async savedoctor(@Body() savereq:SaveReqDoctor): Promise<SaveUpdateResDoctor>{
        const newdoctor:IDOCTOR = await new MainDoctor().saveDoctor(<IDOCTOR> savereq)
        return <SaveUpdateResDoctor>newdoctor;

    }
    @Put("/updatedoctor")
    @Security("jwt")
    async updatedoctor(@Request() request:string, @Body() updatereq:UpdateReqDoctor ) : Promise<SaveUpdateResDoctor>{
   
        const updatedoctor:any= await new MainDoctor().updateDoctor(request,<any> updatereq)
        if(updatedoctor === null) throw new CustomeError(404, 'not supported method')
        return <SaveUpdateResDoctor>updatedoctor;
    }
    @Delete("/deletedoctor")
    @Security("jwt")
    @SuccessResponse("200","Product Deleted")
    async deletedoctor(@Request() deletereq:string):Promise<any>{

        return await new MainDoctor().delDoctor(deletereq)
    }
}