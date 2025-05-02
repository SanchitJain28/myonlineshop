import mongoose from "mongoose";
// const { Schema } = mongoose;

const SellerSchema = new mongoose.Schema({
  businessName:{
    type:String,
    required:true
  } , 
  phoneNo:{
    type:String,
    required:true
  },
  AccountCreated:{
    type:Date,
    required:true
  },
  email:{
    type:String,
    required:true
  },
  address:{
    type:String,
    required:true
  }
});

export const SellerModel=mongoose.model('SellerAccount', SellerSchema);
