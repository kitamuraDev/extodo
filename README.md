# Todo App (server-side app with Express.js)

## アプリの起動方法

1. $ `git clone https://github.com/kitamuraDev/extodo.git`
2. $ `cd extodo`
3. $ `mkdir db && touch extodo.sqlite3`
4. $ `yarn connect`で sqlite3 を起動し、以下の"create users table"と"create tasks table"のコマンドを実行してテーブルを作成する
5. $ `yarn`
6. $ `yarn dev`

<br />

## todo_app（データベース）のテーブル定義

### create users table

```sql
CREATE TABLE users (
  id INTEGER NOT NULL PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (DATETIME('now', 'localtime')),
  updated_at TEXT NOT NULL DEFAULT (DATETIME('now', 'localtime'))
);
```

<br />

### create tasks table

```sql
CREATE TABLE tasks (
  id INTEGER NOT NULL PRIMARY KEY,
  user_id INTEGER NOT NULL,
  content TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (DATETIME('now', 'localtime')),
  updated_at TEXT NOT NULL DEFAULT (DATETIME('now', 'localtime'))
);
```

<br />

## 開発ダイジェスト

1. 必要なライブラリをインストール && ディレクトリを整理
2. DB 設計 && DB 作成
3. 基本的な todo 機能を実装
4. 2 で作成した todo 機能に DB を絡める（todo の保存先を DB に切り替える）
5. 基本的な todo 機能が実装できたところで、ユーザー機能(signup, signin, logout)を追加
6. DB にパスワードを保存する際にハッシュ化（加工）してから DB に突っ込む（※本来は 4 で行う）
7. （本アプリでは）認証管理（サインイン機能（シリアライズやデシリアライズなど）, ログアウト機能）をセッション管理から"passport.js"へ移行した
8. todo と user の紐付け
9. 終わり
