import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import cors from "cors"
import todoRoute from "../Backend/routes/todo.route.js"
import userRoute from "../Backend/routes/user.route.js"
import cookieParser from "cookie-parser"

dotenv.config()

const app = express()
const port = process.env.PORT || 4002
const DB_URI = process.env.MONGODB_URI;

//middleware
app.use(express.json())
app.use(cookieParser())
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
  methods: "GET, POST, PUT, DELETE",
  allowedHeaders: ["Content-Type", "Authorization"]
}))

///db connection
try {
  await mongoose.connect(DB_URI);
  console.log("Connected to MongoDB");
} catch (error) {
  console.log("MONGODB connection failed ", error)
  process.exit(1)
}

//Routes
app.use("/todo", todoRoute)
app.use("/user", userRoute)

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
})