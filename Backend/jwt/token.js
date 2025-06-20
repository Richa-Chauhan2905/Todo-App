import jwt from "jsonwebtoken"
import User from "../model/user.model.js"

export const generateTokenAndSaveInCookies = async (userId, res) => {
    const token = jwt.sign({userId}, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "10d"
    })
    console.log("Token generated")
    res.cookie("jwt", token, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        path: "/"    
    })

    await User.findByIdAndUpdate(userId, {token})
    return token
}