import express from 'express'
import {DoctorController} from "../controller/Doctor.controller"
import {IDOCTOR} from "../types/document/IDOCTOR"
import {SaveReqDoctor,UpdateReqDoctor,GetReqDoctor} from "../types/request/Doctor.Request"
import {SaveUpdateResDoctor} from "../types/response/Doctor.Response"
import CustomeError from "../utils/error"

import jwt  from "jsonwebtoken"
import {secret_token}  from '../middleware/jwttokendecode'
import extractJWT from "../middleware/jwttokendecode"
import apikeyauth from "../middleware/apikeyauth"


export class DoctorRoutes {
    router:express.Router
    constructor(){
        this.router= express.Router()
        this.routes()
    }
    routes(){
        this.router.post('/getdoctor', extractJWT,  async(req:any,res,next)=>{
            try {
               
               
 
               
               
               const doctor:SaveUpdateResDoctor = await new DoctorController().getdoctor(<any>req.user.id)
            
               res.send(doctor)
            } catch (error) {
                next(error)
            }
        })
        this.router.get('/getalldoctor', apikeyauth ,async(req,res,next)=>{
            try {
              
                const alldoc: SaveUpdateResDoctor[]= await new DoctorController().getallDoctor()
              
                res.json({
                    result: alldoc.length,
                    alldoc
                }) 
            } catch (error) {
                next(error)
            }
        })
        this.router.post('/savedoctor', async(req,res,next)=>{
            try {
                const doctor:SaveReqDoctor = req.body
                const {password, email} = req.body
                
                const newdoctor:SaveUpdateResDoctor = await new DoctorController().savedoctor(doctor)
                const access_token = jwt.sign({id: newdoctor._id}, secret_token, {expiresIn:'3d'})
                res.json({
                    access_token,
                    message:'doctor added successfully',
                    newdoctor
                })
            } catch (error) {
                next(error)
            }
        });
        this.router.put('/updatedoctor',extractJWT,async(req:any,res,next)=>{
            try {
                const doctor:UpdateReqDoctor= req.body
             
                const updatedoctor:SaveUpdateResDoctor = await new DoctorController().updatedoctor(<any>req.user.id,doctor)
                res.json({
                    message:"doctor details updated",
                    updatedoctor
                })
            } catch (error) {
                next(error)
            }
        })
        this.router.delete('/deletedoctor',extractJWT, async(req:any,res,next)=>{
            try {
                
                await new DoctorController().deletedoctor(req.user.id)
                res.json({
                    message:"doctor details deleted"
                })
            } catch (error) {
                next(error)
            }
        })
       
    }
}

export const DoctorRoutesApi = new DoctorRoutes().router;