import express from "express"
import jwt from "jsonwebtoken"
const secret="SAnchit28";

export const getSellerInformation=async(req,res,next)=>{
    try {
        const token=req.headers["auth-token"]
        if(!token){
            return res.send({"error":"Please sent a TOken in the header file"})
        }
        const data=await jwt.verify(token,secret)
        req.seller=data
        next();
    } catch (error) {
        console.log(error)
    }
 
}
