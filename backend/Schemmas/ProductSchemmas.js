import mongoose from "mongoose";
// const { Schema } = mongoose;

const ProductSchema = new mongoose.Schema({
    sellerId:{
        type:mongoose.Schema.Types.ObjectId,
    ref:'SellerAccount',
    required:true
    },
  sellerName:{
    type:String,
    required:true
  } , 
  productName:{
    type:String,
    required:true
  },
  productCategory:{
    type:String,
    required:true
  },
  productCreated:{
    type:Date,
    required:true
  },
  productPrice:{
    type:Number,
    required:true
  }, // String is shorthand for {type: String}
  productDescription:{
    type:String,
    required:true
  },
  productReviews:{
    type:[String],
    required:true
  },
  images:{
    type:[String],
      required:true
    
  }
});

export const ProductModel=mongoose.model('Product', ProductSchema);