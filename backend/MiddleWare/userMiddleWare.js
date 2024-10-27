import jwt from "jsonwebtoken"
const secret="SAnchit28";
export const verifyUser = async (req, res, next) => {
    try {
        const token = req.headers["auth-token"]
    if (!token) {
        return res.send({ errors: [{ "msg": "Please provide the Auth-Token" }] })
    }
    const data = await jwt.verify(token, secret)
    req.user = data
    next();
    } catch (error) {
        return error
    }
    
}