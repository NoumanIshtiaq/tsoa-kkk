import {Response, Request, NextFunction} from "express"

const apikeyauth = (req:Request , res:Response , next:NextFunction) => {
        
    let apikey = req.query.admin_token;

        if(apikey){
            if(apikey === "1234567"){
                return next()
            }else{
               return res.status(401).json({msg: "api key is wrorng"})
            }
        }else{
            return res.status(400).json({msg: "no api key is present"})
        }
}

export default apikeyauth;