/**
 * DBのテーブルからレコード全件取得（db.all）
 * @param {strign} sql
 * @param {sqlite3.Database} db
 */
const getAllData = async (sql, db) => {
  return new Promise((resolve, reject) => {
    db.all(sql, (err, rows) => {
      if (err) {
        return reject(err);
      } else {
        return resolve(rows);
      }
    });
  });
};

module.exports = getAllData;
