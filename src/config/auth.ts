import express from "express"
import jwt from "jsonwebtoken"
import { nextTick } from "process";

export const authenticationfunc = (request: express.Request, securityName:string, scopes?:string[],next?:express.NextFunction): Promise<any>=>{
if(securityName === 'api_key'){
    let token;
    if(request.query && request.query.access_token){
        token = request.query.access_token
    }
    if( token === 'abc123'){
        return Promise.resolve({token})
    }
    else {
        return Promise.reject({})
    }
}
return Promise.reject();
}