### AirBnb のコピーサイト

[参考 Repo](https://github.com/AntonioErdeljac/next13-airbnb-clone/tree/master)

#### アーキテクチャ / 使用技術

- Next version : 13.5.6
- DB : MySQL 8.0
- Storage : Cloudinary
- ORM : Prisma
- Auth : Next-Auth
- Style : TailwindCSS

#### 起動方法

1. TOP 階層（ `docker-compose.yml` がある階層）で下記コマンド実行

```
$ docker compose up -d
```

2. アプリケーション階層へ移動して下記のコマンド実行

```
$ cd app
$ npm install
```

3. 環境変数 `app/.env` にローカルで起動している MySQL のパスを指定

```
DATABASE_URL="mysql://<ユーザー名>:<パスワード>@localhost:3306/<DB名>"

docker-compose.ymlファイルを何も変更してなかったら↓となる
-> DATABASE_URL="mysql://root:password@localhost:3306/airbnb-clone-db"
```

4. Prisma の接続とマイグレーションをするコマンドを実行

```
// prisma client の生成コマンド
$ npx prisma generate

// schema の内容を migration を生成せずにDBへ反映コマンド
$ npx prisma db push
```

5. アプリケーション起動

```
$ npm run dev
```
