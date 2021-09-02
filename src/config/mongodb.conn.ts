import {connect, connection} from 'mongoose'

export class MongoDb {
constructor(){}
 connect(h: string, dbName:string, u?:string, pass?:string, p?:string){
    let connectionuri = `mongodb://${h}:${p}/${dbName}` ;
    if(p !== undefined && u !== undefined) {
        connectionuri = `mongodb+srv://${u}:${pass}@{h}/${dbName}`;
    } 
 
 connect(connectionuri,{useCreateIndex:true, useNewUrlParser:true,useFindAndModify:false,useUnifiedTopology:true},(err:any)=>{
     if(err){
         console.log(err)
         console.log('database server connection failed')
     }else {
         console.log('database connection')
     }
 })
}}

export const MonStatConnection = connection.readyState