import mongoose from "mongoose";
import jsonwebtoken from 'jsonwebtoken'

const UserSchemma = new mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  phoneNo:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true
  }, // String is shorthand for {type: String}
  password:{
    type:String,
    required:true
  },
  refreshToken: {
    type: String,
}
});

UserSchemma.methods.generateAccessToken = async function () {
  const token= jsonwebtoken.sign(
      {
          id: this._id,
          name: this.name,
          email: this.password
      },
      "SAnchit28",
      {expiresIn:"6d"}
  )
  return token
}
UserSchemma.methods.generateRefreshToken = async function () {
  return jsonwebtoken.sign(
      {
          id: this._id,
          name: this.name,
          email: this.password
      },
      "SAnchit28",
      {expiresIn:"10d"}
  )
}

export const UserModel=mongoose.model('ExpressTutorial-MakingUser', UserSchemma);


