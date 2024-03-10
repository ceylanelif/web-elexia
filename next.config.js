// next.config.js

module.exports = {
  reactStrictMode: false,
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:8080/api/:path*', // Hedef URL'yi doğru şekilde belirtin
      },
    ];
  },
  images: {
    domains: [], // Resimlerin bulunduğu domainleri buraya ekleyin
  },
};
