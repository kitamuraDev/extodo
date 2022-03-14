/**
 * post, delete, put処理をDBへ行う関数（必要であれば3つを分ける）
 * @param {string} sql
 * @param {sqlite3.Database} db
 */
const run = async (sql, db) => {
  return new Promise((resolve, reject) => {
    db.run(sql, (err) => {
      if (err) {
        return reject(err);
      } else {
        return resolve();
      }
    });
  });
};

module.exports = run;
