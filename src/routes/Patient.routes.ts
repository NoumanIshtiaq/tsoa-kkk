import express from 'express'
import { DoctorController } from '../controller/Doctor.controller'
import {PatientController} from "../controller/Patient.controller"
import {IPATIENT} from "../types/document/IPATIENT"
import {SaveReqPatient,UpdateReqPatient,DelReqPatient,GetReqPatient} from "../types/request/Patient.Request"
import {SaveUpdateResPatient} from "../types/response/Patient.Response"
import CustomeError from "../utils/error"
import {DoctorSchema} from "../model/Doctor.model"
import {PatientSchema} from "../model/Patient.model"
import apikeyauth from "../middleware/apikeyauth"
import jwt from "jsonwebtoken"
import path from 'path'
import { nextTick } from 'process'

const formData = require("express-form-data")


const secret_token = 'whatanewpatientwiildo';


export class PatientRoutes {
    router:express.Router
    constructor(){
        this.router= express.Router()
        this.routes()
    }
    routes(){
        this.router.post('/getpatient', apikeyauth, async(req,res,next)=>{
            try {
               const getreq:GetReqPatient = req.body
               const patient:SaveUpdateResPatient = await new PatientController().getpatient(getreq)
               res.send(patient)
            } catch (error) {
                next(error)
            }
        })
        this.router.post('/savepatient' ,async(req,res,next)=>{
            try {
       
                const avatar:any = req.files;
               console.log(avatar.avatar.path)
               const fileavatar = avatar.avatar.path;
               const finalavatar:any = path.basename(fileavatar)
                if(avatar.avatar.type !== 'image/png'&& avatar.avatar.type !== 'image/jpeg') return res.json({msg:'not supported file'})
                const patient:SaveReqPatient = req.body.savereq
                const {name,email,password,doctor,phone,disease}= req.body;
                
                const assigndoctor = await new DoctorController().getdoctor(req.body.doctor)
        
                const newpatient:SaveUpdateResPatient = await new PatientController().savepatient(finalavatar,name,email,password,phone,disease,doctor)
           
                const some = await DoctorSchema.findByIdAndUpdate(assigndoctor._id,{$push:{patient: newpatient._id}},{new:true})
                
                const patienttoken= jwt.sign({id: newpatient._id}, secret_token, {expiresIn:'2d'})

                res.cookie('refreshtoken', patienttoken,{
                    httpOnly: true,
                    path:'/api/refresh_token',
                    maxAge: 24*30*60*60*1000   //30days
                })
                
                
                    res.json({
                        message:'patient added successfully',
                        newpatient,
                        download_file :fileavatar
                })
                

               
                
            } catch (error) {
                next(error)
            }
        });
        this.router.put('/updatepatient',apikeyauth,async(req,res,next)=>{
            try {
                const patient:UpdateReqPatient= req.body
                console.log(patient)
                const updatepatient:SaveUpdateResPatient = await new PatientController().updatepatient(patient)
                res.json({
                    message:"patient details updated",
                    updatepatient
                })
            } catch (error) {
                next(error)
            }
        })
        this.router.delete('/deletepatient',apikeyauth,async(req,res,next)=>{
            try {
                const delreq:DelReqPatient = req.body
               
                const dt = await PatientSchema.findById(delreq._id)
                
                const delpa = await DoctorSchema.findById({ _id:  dt?.doctor})
                
                const some = await DoctorSchema.findByIdAndUpdate(delpa?._id, {$pull: {patient: delreq._id}},{new:true})
                
                await new PatientController().deletepatient(delreq)
                res.json({
                    message:"patient details deleted",
                    
                })
            } catch (error) {
                next(error)
            }
        })
        this.router.get('/reportpatient', async (req,res,next)=>{
                try {
                    
                    const id:any = req.query.id
                    const report:any = await new PatientController().reportpatient(id)
                    console.log(report)
                    // res.json({msg:"response counted"})
                    const fil= `${__dirname}\\..\\publi\\${report.avatar}`
                    res.download(fil)
                    //  res.sendFile(fil)
                    // res.download(path.join(__dirname  +'..\\'+ '\\publi\\' + report.avatar))
                } catch (err) {
                    next(err)
                }
        })
        this.router.post('/uploadreportpatient', async(req,res,next)=>{
            try {
                const id = req.body.id
                const repor:any = req.files
                console.log(req.files)
                // const rep = await new PatientController().uploadreportpatient(id, repor)
                // console.log({rep})
                res.json({msg:'hello G'})
            } catch (error) {
                next(error)
            }
           

            // const updatereport = await new PatientController().reportofpatient(id,repor)
            //  console.log(updatereport)


        })
    }
}

export const PatientRoutesApi = new PatientRoutes().router;