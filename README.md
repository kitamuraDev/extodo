# todo_app（データベース）のテーブル定義

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

##### add sanple data

```sql
INSERT INTO users (name, password) VALUES ("Sakuta", "seisyunbutayarou")
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

##### add sanple data

```sql
INSERT INTO tasks (user_id, content) VALUES (1, "青ブタを100周する")
```

<br />

# 開発手順メモ

1. 必要なライブラリをインストール && ディレクトリを整理
2. 基本的な todo 機能を実装
3. 2 で作成した todo 機能に DB を絡める
4. 基本的な todo 機能が実装できたところで、ユーザー機能(signup, signin, logout)を追加
