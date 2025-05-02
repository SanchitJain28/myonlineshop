import express from "express"
import jwt from "jsonwebtoken"
const secret="SAnchit28";
import { SellerModel as seller } from "../Schemmas/SellerAccountUserSchemma.js";

export const getSellerInformation=async(req,res,next)=>{
    try {
        const token=req.headers["auth-token"] || req.cookies.accessToken
        if(!token){
            return res.send({"error":"Please sent a TOken in the header file"})
        }
        const data= jwt.verify(token,secret)
        console.log(data)
        req.seller=data
        next();
    } catch (error) {
        console.log(error)
    }
 
}
