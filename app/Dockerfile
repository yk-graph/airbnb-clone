FROM node:18-alpine

WORKDIR /app

# ホスト側の package.json とそれに関連するロックファイルをコピーして、コンテナ側の作業ディレクトリ app/ に配置する
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
RUN \
  if [ -f package-lock.json ]; then npm ci; \
  # パッケージマネージャーに応じて依存関係をインストール -> ロックファイルが存在しない場合は警告メッセージが表示し npm install を実行する
  else echo "Warning: Lockfile not found. It is recommended to commit lockfiles to version control." && npm install; \
  fi

COPY prisma ./prisma
COPY public ./public
COPY src ./src
COPY next.config.js .
COPY postcss.config.js .
COPY tailwind.config.ts .
COPY tsconfig.json .

# パッケージマネージャーに応じて、Next.jsの開発サーバーを起動
CMD npx prisma generate && \
    npm run build && \
    npm run start
