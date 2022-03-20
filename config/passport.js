const passport = require('passport');
const LocalStrategy = require('passport-local');
const cookieSession = require('cookie-session');
const secret = 'secretCuisine123';
const sqlite3 = require('sqlite3');
const dbPath = 'db/extodo.sqlite3';
const getAllData = require('../store/getAllData');
const findById = require('../store/findById');
const bcrypt = require('bcrypt');

// 認証処理を担う関数
module.exports = (app) => {
  /** Cookie setup */
  app.use(
    cookieSession({
      name: 'session',
      keys: [secret],

      // Cookie Options
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session()); // セッションが有効な間、リクエストのたびにデシリアライズを実行し、req.userの更新を行う

  passport.use(
    new LocalStrategy(
      {
        // <input>タグのname属性で指定したデータ名が入る（対象ファイルはsignin.ejs）
        usernameField: 'username',
        passwordField: 'password',
      },
      async (username, password, done) => {
        const db = new sqlite3.Database(dbPath);

        try {
          const result = await getAllData(
            `SELECT * FROM users WHERE name = "${username}"`,
            db,
          );

          if (result.length === 0) {
            return done(null, false, { message: 'ユーザーが見つかりません' });
          } else if (await bcrypt.compare(password, result[0].password)) {
            return done(null, result[0]);
          } else {
            return done(null, false, { message: 'パスワードが一致しません' });
          }
        } catch (e) {
          console.error(e);
          return done(null, false, { message: e.toString() });
        }
      },
    ),
  );

  // シリアライズは、ユーザ情報をセッションに保存すること
  // なお、認証（サインイン）のタイミングでのみ実行される
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  // デシリアライズは、IDからユーザ情報を特定し、req.userに格納すること
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await findById(id); // 【注意】findByIdで取れてくるデータ形式は[{}]です。
      done(null, user);
    } catch (e) {
      done(e, null);
    }
  });
};
