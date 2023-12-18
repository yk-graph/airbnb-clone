## AirBnb のコピーサイト

[参考 Repo](https://github.com/AntonioErdeljac/next13-airbnb-clone/tree/master)

### アーキテクチャ / 使用技術

- Next version : 13.5.6
- DB : MySQL 8.0
- Storage : Cloudinary
- ORM : Prisma
- Auth : Next-Auth
- Style : TailwindCSS

### 起動方法

1. TOP 階層（ `docker-compose.yml` がある階層）で下記コマンド実行<br>DB のコンテナと App のコンテナを起動する

```
// 初回の立ち上げのときのみ --build オプションを付ける
$ docker compose up --build -d

// 上記以外
$ docker compose up -d
```

2. 環境変数 `/.env` を作成し、必要な値を入力

```
DATABASE_URL="mysql://<ユーザー名>:<パスワード>@<DBのコンテナ名>:3306/<DB名>"
// docker-compose.ymlファイルを何も変更してなかったら↓となる
// DATABASE_URL="mysql://root:password@airbnb-clone-db:3306/airbnb-clone-db"

NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="<JWTを作成する際のシークレットキー>"

GITHUB_ID="<GITHUBの外部認証で使用するID>"
GITHUB_SECRET="<GITHUBの外部認証で使用するSECRET>"

GOOGLE_ID="<GOOGLEの外部認証で使用するID>"
GOOGLE_SECRET="<GOOGLEの外部認証で使用するSECRET>"

NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="<CloudinaryのNAMEの値>"
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET="<CloudinaryのUPLOAD_PRESETの値>"
```

3. Prisma の接続とマイグレーションをするコマンドを実行

```
// prisma client の生成コマンド
$ docker compose exec app npx prisma generate

// 初回のみ schema の内容を migration を生成せずにDBへ反映させる
$ docker compose exec app npx prisma db push
```

4. 起動している開発サーバーにアクセス<br>http://localhost:3000
