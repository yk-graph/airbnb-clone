# ==================================================
# パッケージのインストールのレイヤー
# ==================================================
FROM node:18-alpine

WORKDIR /app

# ホスト側の package.json とそれに関連するロックファイルをコピーして、コンテナ側の作業ディレクトリ app/ に配置する
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then yarn global add pnpm && pnpm i; \
  # パッケージマネージャーに応じて依存関係をインストール -> ロックファイルが存在しない場合は警告メッセージが表示し npm install を実行する
  else echo "Warning: Lockfile not found. It is recommended to commit lockfiles to version control." && npm install; \
  fi

COPY prisma ./prisma
COPY src ./src
COPY public ./public
COPY next.config.js .
COPY postcss.config.js .
COPY tailwind.config.ts .
COPY tsconfig.json .

# Next.js collects completely anonymous telemetry data about general usage. Learn more here: https://nextjs.org/telemetry
# Uncomment the following line to disable telemetry at run time
# ENV NEXT_TELEMETRY_DISABLED 1

# パッケージマネージャーに応じて、Next.jsの開発サーバーを起動
CMD \
  if [ -f yarn.lock ]; then yarn dev; \
  elif [ -f package-lock.json ]; then npm run dev; \
  elif [ -f pnpm-lock.yaml ]; then pnpm dev; \
  else yarn dev; \
  fi