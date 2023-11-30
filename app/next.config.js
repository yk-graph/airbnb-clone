/** @type {import('next').NextConfig} */
const nextConfig = {
  // [Tips] 外部の画像配信サービスから画像をアプリ内で表示する場合の設定方法
  images: {
    domains: [
      'avatars.githubusercontent.com',
      'lh3.googleusercontent.com',
      'res.cloudinary.com',
    ],
  },
}

module.exports = nextConfig
