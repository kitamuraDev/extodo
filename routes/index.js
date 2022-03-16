const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3');
const dbPath = 'db/extodo.sqlite3';
const getAllData = require('../store/getAllData');
const run = require('../store/run');

/* get top page */
router.get('/', async (req, res) => {
  const db = new sqlite3.Database(dbPath);
  const userId = req.session.userid;
  const isAuth = Boolean(userId);

  try {
    const todos = await getAllData('SELECT * FROM tasks', db);
    res.render('index', {
      title: 'ExTodo',
      todos: todos,
      isAuth: isAuth,
    });
  } catch (e) {
    console.error(e);
  }
});

/** post input todo content */
router.post('/', async (req, res) => {
  const db = new sqlite3.Database(dbPath);
  const todo = req.body.add;
  const userId = req.session.userid;
  const isAuth = Boolean(userId);

  try {
    await run(
      `INSERT INTO tasks (user_id, content) VALUES (${userId}, "${todo}")`,
      db,
    );
    res.redirect('/');
  } catch (e) {
    console.error(e);
    res.render('index', {
      title: 'ExTodo',
      isAuth: isAuth,
    });
  }
});

/** "/"以下のルーティング */
router.use('/signup', require('./signup'));
router.use('/signin', require('./signin'));
router.use('/logout', require('./logout'));

module.exports = router;
