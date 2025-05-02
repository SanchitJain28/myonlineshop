import { Router } from "express";
//BICRYPT
import bcrypt from "bcryptjs";
var salt = bcrypt.genSaltSync(10);

//middleWare
import { getSellerInformation } from "../MiddleWare/sellerAccount.js";

//JSONWEBTOOKEN
import jwt from "jsonwebtoken";
const secret = "SAnchit28";

//EXpress validator
import { body, validationResult } from "express-validator";

//file imports
import { UserModel as User } from "../Schemmas/UserSchemma.js";
import { SellerModel as Seller } from "../Schemmas/SellerAccountUserSchemma.js";
import { verifyUser } from "../MiddleWare/userMiddleWare.js";
import { orderModel as order } from "../Schemmas/OrderSchemma.js";

//express Router
export const router = Router();

router.get("/test", (req, res) => {
  res.send({ Testing: "Hey it is running" });
});

//For Creating a user

router.post(
  "/api/createuser",
  body("email")
    .notEmpty()
    .withMessage("email feild cannot be empty!!!")
    .isEmail()
    .withMessage("this is not a valid email!!"),
  body("password").notEmpty().withMessage("Password Cannot be empty!!"),
  body("name").notEmpty().withMessage("name Cannot be empty!!"),
  body("phoneNo").notEmpty().withMessage("PhoneNo Cannot be empty!!"),
  async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.send({ errors: result.array(), success: "false" });
    }
    const isuser = await User.findOne({ email: req.body.email });
    if (isuser) {
      return res.send({ errors: [{ msg: "User Already there" }] });
    }
    const password = await bcrypt.hash(req.body.password, salt);
    const user = new User({
      name: req.body.name,
      phoneNo: req.body.phoneNo,
      email: req.body.email,
      password: password,
    });
    const token = jwt.sign({ user_id: user.id, email: user.email }, secret);
    await user.save();

    res.send({ user: user, token: token });
  }
);

//logging in a user
router.post(
  "/api/loginuser",
  body("email")
    .notEmpty()
    .withMessage("Email cannot be empty")
    .isEmail()
    .withMessage("Please Enter the correct email"),
  body("password").notEmpty().withMessage("Password cannot be empty"),
  async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.send({ errors: result.array() });
    }
    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        return res.send({ errors: [{ msg: "Please register on this app" }] });
      }
      const isPassword = await bcrypt.compare(req.body.password, user.password);
      if (!isPassword) {
        return res.status(401).json({
          status: false,
          errors: [{ msg: "Password is Incorrect" }],
        });
      }
      const accessToken = await user.generateAccessToken();
      const refreshToken = await user.generateRefreshToken();
      user.refreshToken = refreshToken;
      await user.save();
      const refreshTokenOption = {
        httpOnly: true,
        secure: true,
        expires: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
        sameSite: "None",
      };
      const option = {
        httpOnly: true,
        secure: true,
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        sameSite: "None",
      };
      return res
        .status(200)
        .cookie("refreshToken", refreshToken, refreshTokenOption)
        .cookie("accessToken", accessToken, option)
        .json({
          status: true,
          message: "Login Successfully",
          data: user,
        });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        status: false,
        message: "Internal servor error",
      });
    }
  }
);

router.get("/api/getuser", verifyUser, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    return res.status(200).json({
      status: true,
      message: "User Fetched Successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: false,
      message: "Internal servor error",
    });
  }
});

//Seller account
router.post(
  "/api/selleraccount",
  body("email")
    .notEmpty()
    .withMessage("email cannot be empty")
    .isEmail()
    .withMessage("enter a valid email"),
  body("password").notEmpty().withMessage("password cannot be empty"),
  body("businessName")
    .notEmpty()
    .withMessage("Business name cannot be empty be empty"),
  body("phoneNo").notEmpty().withMessage("Phone no cannot be empty"),
  async (req, res) => {
    try {
      const result = validationResult(req);
      if (!result.isEmpty()) {
        return res.send({ errors: result.array() });
      }
      const isuser = await Seller.findOne({ email: req.body.email });
      if (isuser) {
        return res.send({ errors: [{ msg: "User already there" }] });
      }
      const password = await bcrypt.hash(req.body.password, salt);
      const sellAccount = new Seller({
        businessName: req.body.businessName,
        phoneNo: req.body.phoneNo,
        AccountCreated: new Date(),
        email: req.body.email,
        password: password,
      });
      await sellAccount.save();
      const token = jwt.sign(
        { BusinessName: sellAccount.businessName, sellerid: sellAccount.id },
        secret
      );

      res.send({
        Success: "Accound Succesfully created",
        seller: sellAccount,
        token: token,
      });
    } catch (error) {
      console.log(error);
    }
  }
);

//seller login
router.post(
  "/api/sellerlogin",
  body("email")
    .notEmpty()
    .withMessage("Email cannot be empty")
    .isEmail()
    .withMessage("Enter a valid email"),
  body("password").notEmpty().withMessage("Password cannot be empty"),
  async (req, res) => {
    try {
      const result = validationResult(req);
      if (!result.isEmpty()) {
        console.log(req.body);
        return res.send({ errors: result.array() });
      }
      const findSeller = await Seller.findOne({ email: req.body.email });
      if (!findSeller) {
        return res.send({
          errors: [
            {
              msg: "Cant find you as a seller ,Please first register as a seller",
            },
          ],
        });
      }
      const comparePassword = await bcrypt.compare(
        req.body.password,
        findSeller.password
      );
      if (!comparePassword) {
        return res.send({ errors: [{ msg: "Password is Incorrect" }] });
      }
      const token = jwt.sign(
        {
          BusinessName: findSeller.businessName,
          sellerid: findSeller.id,
          email: findSeller.email,
        },
        secret
      );
      res.send({ token: token });
    } catch (error) {
      return error;
    }
  }
);

//user details
router.get("/api/userdetails", verifyUser, async (req, res) => {
  try {
    const { user_id } = req.user;
    if (!user_id) {
      return res.send({ errors: [{ msg: "Please provide the token" }] });
    }
    const userDetails = await User.findById(user_id);
    const userOrders = await order
      .find({ user: user_id })
      .populate("orderItems.product");
    res.send({ userDetails, userOrders: userOrders });
  } catch (error) {
    console.log(error);
  }
});
