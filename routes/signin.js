const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3');
const dbPath = 'db/extodo.sqlite3';
const getAllData = require('../store/getAllData');

/** get signin page */
router.get('/', (req, res) => {
  res.render('signin', {
    title: 'Sign in',
  });
});

/** post auth info */
router.post('/', async (req, res) => {
  const db = new sqlite3.Database(dbPath);
  const username = req.body.username;
  const password = req.body.password;

  try {
    const result = await getAllData(
      `SELECT * FROM users WHERE name = "${username}" AND password = "${password}"`,
      db,
    );
    if (result.length === 0) {
      res.render('signin', {
        title: 'Sign in',
        errorMessage: 'ユーザが見つかりません',
      });
    } else {
      req.session.userid = result[0].id; // セッションにユーザーIDを保存
      res.redirect('/');
    }
  } catch (e) {
    console.error(e);
    res.render('signin', {
      title: 'Sign in',
      errorMessage: e,
      isAuth: false,
    });
  }
});

module.exports = router;
