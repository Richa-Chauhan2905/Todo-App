import User from "../model/user.model.js";
import { z } from "zod"
import { generateTokenAndSaveInCookies } from "../jwt/token.js";
import bcrypt from "bcryptjs"

const userSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    username: z.string().min(3, { message: "Username must be atleast 3 characters long" }).max(20, { message: "Username can't be more than 20 characters long" }),
    password: z.string().min(8, { message: "Password must be atleast 8 characters long" }).max(20, { message: "Password can't be more than 20 characters long" }),
})

export const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!email || !username || !password) {
            return res.status(400).json({
                errors: "All fields are required",
            });
        }

        const validation = userSchema.safeParse({ username, email, password });

        if (!validation.success) {
            const errorMessage = validation.error.errors.map((err) => err.message);
            return res.status(400).json({ errors: errorMessage });
        }

        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                errors: "User already exists",
            });
        }

        const hashPass = await bcrypt.hash(password, 10);
        const newUser = new User({ email, username, password: hashPass });
        await newUser.save();

        if (newUser) {
            const token = await generateTokenAndSaveInCookies(newUser._id, res);
            return res.status(200).json({
                message: "User registered successfully",
                newUser,
                token,
            });
        }

        // fallback in case user creation fails silently
        return res.status(500).json({ message: "User registration failed" });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "An error occurred while registering user",
        });
    }
};


export const login = async (req, res) => {
    const { email, password } = req.body
    try {
        if (!email || !password) {
            res
                .status(400)
                .json({
                    errors: "All fields are required"
                })
        }
        const user = await User.findOne({ email }).select("+password")

        if (!user || !(await bcrypt.compare(password, user.password))) {
            res
                .status(400)
                .json({
                    errors: "Invalid email or password"
                })
        }
        const token = await generateTokenAndSaveInCookies(user._id, res)
        res
            .status(200)
            .json({
                message: "User logged in successfully", user
            })
    } catch (error) {
        res
            .status(400)
            .json({
                message: "An error occured while registering user"
            })
    }
}
export const logout = (req, res) => {
    try {
        res.clearCookie("jwt", {
            path: "/",
        })
        res
            .status(200)
            .json({
                message: "User logged out successfully"
            })
    } catch (error) {
        res
            .status(400)
            .json({
                message: "An error occured while logging out"
            })
    }
}