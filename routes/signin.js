const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3');
const dbPath = 'db/extodo.sqlite3';
const getAllData = require('../store/getAllData');
const bcrypt = require('bcrypt');

/** get signin page */
router.get('/', (req, res) => {
  const userId = req.session.userid;
  const isAuth = Boolean(userId);
  res.render('signin', {
    title: 'Sign in',
    isAuth: isAuth,
  });
});

/** post auth info */
router.post('/', async (req, res) => {
  const db = new sqlite3.Database(dbPath);
  const userId = req.session.userid;
  const isAuth = Boolean(userId);
  const username = req.body.username;
  const password = req.body.password;

  try {
    const result = await getAllData(
      `SELECT * FROM users WHERE name = "${username}"`,
      db,
    );
    if (result.length === 0) {
      res.render('signin', {
        title: 'Sign in',
        errorMessage: 'ユーザが見つかりません',
        isAuth: isAuth,
      });
    } else if (await bcrypt.compare(password, result[0].password)) {
      req.session.userid = result[0].id; // セッションにユーザーIDを保存
      res.redirect('/');
    } else {
      res.render('signin', {
        title: 'Sign in',
        errorMessage: 'パスワードが一致しません',
        isAuth: isAuth,
      });
    }
  } catch (e) {
    console.error(e);
    res.render('signin', {
      title: 'Sign in',
      errorMessage: e,
      isAuth: isAuth,
    });
  }
});

module.exports = router;
