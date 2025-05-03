import jwt from "jsonwebtoken";
const secret = "SAnchit28";
export const verifyUser = async (req, res, next) => {
  try {
    const token = req.cookies.accessToken || req.headers["Authorization"];
    if (!token) {
      return res.send({ errors: [{ msg: "Please provide the Auth-Token" }] });
    }
    const data =  jwt.verify(token, secret);
    req.user = data;
    next();
  } catch (error) {
    return res.status(500).json({
        status:false,
        message:"Internal servor occured"
    })
  }
};
