import Todo from "../model/todo.model.js"

export const createTodo = async (req, res) => {
    const todo = new Todo({
        text: req.body.text,
        completed: req.body.completed
    })

    try {
        const newTodo = await todo.save()
        res
            .status(201)
            .json({
                message: "Todo created successfully", newTodo
            })
    } catch (error) {
        console.log(error)
        res
            .status(400)
            .json({
                message: "An error occured while creating todo"
            })
    }
}


export const getTodos = async (req, res) => {
    try {
        const todos = await Todo.find()
        res
            .status(200)
            .json({
                message: "Todos fetched successfully", todos
            })
    } catch (error) {
        res
            .status(400)
            .json({
                message: "Error while fetching todo", error
            })
    }
}

export const updateTodo = async (req, res) => {
    try {
        const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        })
        res
            .status(200)
            .json({
                message: "Todo updated successfully", todo
            })
    } catch (error) {
        res
            .status(400)
            .json({
                message: "Error while updating todo", error
            })
    }
}

export const deleteTodo = async(req, res) => {
    try {
        const todo = await Todo.findByIdAndDelete(req.params.id)
        if(!todo){
            res
            .status(404)
            .json({message: "Todo not found"})
        }
        res
            .status(200)
            .json({
                message: "Todo deleted successfully"
            })
    } catch (error) {
        res
            .status(400)
            .json({
                message: "Error while updating todo", error
            })
    }
}