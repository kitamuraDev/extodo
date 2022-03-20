const express = require('express');
const router = express.Router();
const passport = require('passport');

/** get signin page */
router.get('/', (req, res) => {
  const isAuth = req.isAuthenticated();
  res.render('signin', {
    title: 'Sign in',
    isAuth: isAuth,
  });
});

/** signin */
router.post(
  '/',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/signin',
    failureFlash: true, // trueに設定することで認証時に発生したエラーメッセージを利用できる
  }),
);

module.exports = router;
