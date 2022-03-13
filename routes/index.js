const express = require('express');
const router = express.Router();

let todos = [];

/* get top page */
router.get('/', (_req, res) => {
  res.render('index', {
    title: 'ExTodo',
    todos: todos,
  });
});

/** post input todo content */
router.post('/', (req, res) => {
  const todo = req.body.add;
  todos.push(todo);
  res.redirect('/');
});

module.exports = router;
