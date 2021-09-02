import {Request, Response, NextFunction} from "express"
import jwt from "jsonwebtoken"
import {DoctorSchema} from "../model/Doctor.model"
import { IDOCTOR } from "../types/document/IDOCTOR"
import { SaveUpdateResDoctor } from "../types/response/Doctor.Response"

export const secret_token = "abc12334"

const extractJWT = async (req:any , res:Response, next:NextFunction) =>{
    let token = req.headers.authorization?.split(' ')[1];
    let authdoctor;

    if (!token) {
        return res.status(403).send("A token is required for authentication");
      }
      try {
        const decoded = jwt.verify(token, secret_token);
        req.user = decoded;
   
      } catch (err) {
        return res.status(401).send("Invalid Token");
      }
      return next();
    };
     
    // if (token) {
    //     jwt.verify(token, secret_token, async (error, decoded)=>{
    //         if(error) {
    //             return res.status(400).json({
    //                 msg: "token not work"
    //             })
    //         }else {
                
    //             const Doctor = await DoctorSchema.findOne({_id:decoded?.id})

                
    //             authdoctor = Doctor;
    //             console.log(Doctor)
    //             console.log(Doctor?._id)
                
    //             next(authdoctor);
                
    //             console.log('after next')
    //         }
    //     })
    // }
    // else {
    //     return res.status(401).json({
    //         msg: "unAuthorizate"
    //     })
    // }
    


export default extractJWT;
