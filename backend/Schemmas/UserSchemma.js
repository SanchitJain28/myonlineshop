import mongoose from "mongoose";
import jsonwebtoken from "jsonwebtoken";

const UserSchemma = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phoneNo: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  }, // String is shorthand for {type: String}
  password: {
    type: String,
    required: true,
  },
  refreshToken: {
    type: String,
  },
  isSeller: {
    type: Boolean,
    default: false,
  },
  sellerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SellerAccount", // This should match the model name of your SellerAccounts collection
    default: null,
  },
});

UserSchemma.pre("save", function (next) {
  if (this.isSeller && !this.sellerId) {
    return next(new Error("Seller ID is required when isSeller is true"));
  }
  next();
});

UserSchemma.methods.generateAccessToken = async function () {
  const token = jsonwebtoken.sign(
    {
      id: this._id,
      name: this.name,
      email: this.password,
    },
    "SAnchit28",
    { expiresIn: "6d" }
  );
  return token;
};
UserSchemma.methods.generateRefreshToken = async function () {
  return jsonwebtoken.sign(
    {
      id: this._id,
      name: this.name,
      email: this.password,
    },
    "SAnchit28",
    { expiresIn: "10d" }
  );
};

export const UserModel = mongoose.model(
  "ExpressTutorial-MakingUser",
  UserSchemma
);
