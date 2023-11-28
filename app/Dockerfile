# ==================================================
# パッケージのインストールのレイヤー
# ==================================================
FROM node:18-alpine AS deps
WORKDIR /base

COPY package.json package-lock.json ./
RUN  npm install --production


# ==================================================
# アプリのビルドレイヤー
# ==================================================
FROM node:18-alpine AS builder
WORKDIR /build
COPY --from=deps /base/node_modules ./node_modules

COPY ./src /build/src
COPY package.json ./

# buildは、tsからjsに変換するのでこれがないとエラーになる
COPY tsconfig.json .

# nextのbuildの設定ルール
COPY next.config.js .

RUN npm run build


# ==================================================
# アプリの実行レイヤー
# ==================================================
FROM node:18-alpine AS runner
#
WORKDIR /app

COPY --from=builder /build/.next ./.next
COPY --from=builder /build/node_modules ./node_modules
COPY --from=builder /build/package.json ./package.json

CMD ["npm", "start"]