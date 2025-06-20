import express from "express"
import { 
    createTodo, 
    deleteTodo, 
    getTodos, 
    updateTodo 
} from "../controller/todo.controller.js"
import { auth } from "../middleware/auth.middleware.js"

const router = express.Router()

router.post("/create", auth, createTodo)
router.get("/fetch",auth, getTodos)
router.put("/update/:id",auth, updateTodo)
router.delete("/delete/:id", auth, deleteTodo)

export default router