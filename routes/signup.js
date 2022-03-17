const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3');
const dbPath = 'db/extodo.sqlite3';
const getAllData = require('../store/getAllData');
const run = require('../store/run');
const bcrypt = require('bcrypt');

/** get /signup page */
router.get('/', (_req, res) => {
  res.render('signup', {
    title: 'Sign up',
  });
});

/** post form data (create user) */
router.post('/', async (req, res) => {
  const db = new sqlite3.Database(dbPath);
  const userId = req.session.userid;
  const isAuth = Boolean(userId);
  const username = req.body.username;
  const password = req.body.password;
  const repassword = req.body.repassword;

  try {
    const result = await getAllData(
      `SELECT * FROM users WHERE name = "${username}"`,
      db,
    );
    if (result.length !== 0) {
      res.render('signup', {
        title: 'Sign up',
        errorMessage: 'このユーザー名は既に使われています',
        isAuth: isAuth,
      });
    } else if (password === repassword) {
      const hassedPassword = await bcrypt.hash(password, 10);
      await run(
        `INSERT INTO users (name, password) VALUES ("${username}", "${hassedPassword}")`,
        db,
      )
        .then(res.redirect('/'))
        .catch((e) => {
          res.render('signup', {
            title: 'Sign up',
            errorMessage: e,
            isAuth: isAuth,
          });
        });
    } else {
      res.render('signup', {
        title: 'Sign up',
        errorMessage: 'パスワードが一致しません',
        isAuth: isAuth,
      });
    }
  } catch (e) {
    console.error(e);
    res.render('signup', {
      title: 'Sign up',
      errorMessage: e,
      isAuth: isAuth,
    });
  }
});

module.exports = router;
