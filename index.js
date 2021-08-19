// Packages
const express = require("express");
const cors = require("cors")
const pool = require("./db");


//Application
const app = express();

//MiddleWare
app.use(cors({ 
    origin: "*"
}))
app.use(express.json())

//PORT
const PORT = process.env.PORT || 5000;

//ROUTES//

//Create Todo

app.post('/todos', async (req, res) => {
    try {
        const { description } = req.body;
        // Insert new todo.
        const newTodo = await pool.query(
            "INSERT INTO todo (description) VALUES($1) RETURNING *", 
            [description]
        )

        res.json(newTodo.rows[0])
    } catch (error) {
        console.log(error.message);
    }
})

//Get all Todos

app.get("/todos", async (req, res) => {
    try {
        const allTodos = await pool.query("SELECT * FROM todo;");
        return res.json(allTodos.rows)
    } catch (error) {
        console.error(error.message)
    }
})

// Get a Todo

app.get("/todos/:id", async (req, res) => {
    try {
        const allTodos = await pool.query("SELECT * FROM todo WHERE todo_id = $1;", [req.params.id]);
        return res.json(allTodos.rows[0])
    } catch (error) {
        console.error(error.message)
    }
})

//Update a Todo

app.put("/todos/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const { description } = req.body;
      const updateTodo = await pool.query(
        "UPDATE todo SET description = $1 WHERE todo_id = $2",
        [description, id]
      );
  
      res.json("Todo was Updated!");
    } catch (err) {
      console.error(err.message);
    }
});

//Delete a 

app.delete("/todos/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [
        id
      ]);
      res.json("Todo was deleted!");
    } catch (err) {
      console.log(err.message);
    }
});


//Runner
app.listen(PORT, () => {
    console.log(`Server Running on Port ${PORT}.`) 
})