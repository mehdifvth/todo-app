const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

let todos = [];

app.use(express.static('public'));
app.use(express.json());

// Get all todos
app.get('/api/todos', (req, res) => {
  res.json(todos);
});

// Add a new todo
app.post('/api/todos', (req, res) => {
  const todo = {
    id: Date.now(),
    text: req.body.text,
    completed: false
  };
  todos.push(todo);
  res.json(todo);
});

// Toggle todo
app.put('/api/todos/:id', (req, res) => {
  const todo = todos.find(t => t.id == req.params.id);
  if (todo) {
    todo.completed = !todo.completed;
    res.json(todo);
  }
});

// Delete todo
app.delete('/api/todos/:id', (req, res) => {
  todos = todos.filter(t => t.id != req.params.id);
  res.json({ success: true });
});

app.listen(PORT, () => {
  console.log(`Todo app running on port ${PORT}`);
});