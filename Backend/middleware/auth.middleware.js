import jwt from 'jsonwebtoken'
import User from "../model/user.model.js"

export const auth = async (req, res, next) => {
    const token = req.cookies.jwt
    console.log("jwt middleware token", token)
    if(!token){
        res
        .status(401)
        .json({
            message: "Unauthorized"
        })
    }
    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        req.user = await User.findById(decoded.userId)
    } catch (error) {
        res
        .status(401)
        .json({
            message: "" + error.message       
        })
    }
    next()
}