const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3');
const dbPath = 'db/extodo.sqlite3';
const getAllData = require('../store/getAllData');
const run = require('../store/run');

/* get top page */
router.get('/', async (req, res) => {
  const db = new sqlite3.Database(dbPath);
  const isAuth = req.isAuthenticated();

  if (isAuth) {
    const userId = req.user[0].id;
    const userName = req.user[0].name;
    try {
      const todos = await getAllData(
        `SELECT * FROM tasks WHERE user_id = ${userId}`,
        db,
      );
      res.render('index', {
        title: 'ExTodo',
        userName: userName,
        todos: todos,
        isAuth: isAuth,
      });
    } catch (e) {
      console.error(e);
      res.render('index', {
        title: 'ExTodo',
        isAuth: isAuth,
        errorMessage: e,
      });
    }
  } else {
    res.render('index', {
      title: 'ExTodo',
      isAuth: isAuth,
    });
  }
});

/** post input todo content */
router.post('/', async (req, res) => {
  /**
   * - userはpassport.jsのdeserializeUser()で作成されたオブジェクト
   * - findByIdの結果（ユーザー情報）が格納されている
   */
  const userId = req.user[0].id;
  const todo = req.body.add;
  const db = new sqlite3.Database(dbPath);
  const isAuth = req.isAuthenticated();

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
      errorMessage: e,
    });
  }
});

/** delete todo (post id) */
router.post('/del', async (req, res) => {
  const db = new sqlite3.Database(dbPath);
  const isAuth = req.isAuthenticated();
  const todo_id = req.body.id;

  try {
    await run(`DELETE FROM tasks WHERE id = ${todo_id}`, db);
    res.redirect('/');
  } catch (e) {
    console.error(e);
    res.render('index', {
      title: 'ExTodo',
      isAuth: isAuth,
      errorMessage: e,
    });
  }
});

/** put todo (post id, content) */
router.post('/edit', async (req, res) => {
  const db = new sqlite3.Database(dbPath);
  const isAuth = req.isAuthenticated();
  const todo_id = req.body.update_todo_id;
  const todo_content = req.body.update_todo_content;

  try {
    await run(
      `UPDATE tasks SET content="${todo_content}" WHERE id = ${todo_id}`,
      db,
    );
    res.redirect('/');
  } catch (e) {
    console.error(e);
    res.render('index', {
      title: 'ExTodo',
      isAuth: isAuth,
      errorMessage: e,
    });
  }
});

/** "/"以下のルーティング */
router.use('/signup', require('./signup'));
router.use('/signin', require('./signin'));
router.use('/logout', require('./logout'));

module.exports = router;
