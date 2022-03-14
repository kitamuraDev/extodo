const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3');
const dbPath = 'db/extodo.sqlite3';
const getAllData = require('../store/getAllData');
const run = require('../store/run');

/* get top page */
router.get('/', async (_req, res) => {
  const db = new sqlite3.Database(dbPath);

  try {
    const todos = await getAllData('SELECT * FROM tasks', db);
    res.render('index', {
      title: 'ExTodo',
      todos: todos,
    });
  } catch (e) {
    console.error(e);
  }
});

/** post input todo content */
router.post('/', async (req, res) => {
  const db = new sqlite3.Database(dbPath);
  const todo = req.body.add;

  try {
    await run(`INSERT INTO tasks (user_id, content) VALUES (1, "${todo}")`, db);
    res.redirect('/');
  } catch (e) {
    console.error(e);
  }
});

module.exports = router;
