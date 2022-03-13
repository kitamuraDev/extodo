const express = require('express');
const router = express.Router();

/* get top page */
router.get('/', function (_req, res, _next) {
  res.render('index', { title: 'ExTodo' });
});

module.exports = router;
