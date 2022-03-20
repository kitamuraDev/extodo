const sqlite3 = require('sqlite3');
const dbPath = 'db/extodo.sqlite3';

/**
 * 与えられたidを元にusersテーブルからユーザ情報を検索する関数
 * @param {number} userId
 */
const findById = async (userId) => {
  const db = new sqlite3.Database(dbPath);
  return new Promise((resolve, reject) => {
    db.all(`SELECT * FROM users WHERE id = ${userId}`, (err, rows) => {
      if (err) {
        return reject(err);
      } else {
        return resolve(rows); // 形式は [{}]
      }
    });
  });
};

module.exports = findById;
