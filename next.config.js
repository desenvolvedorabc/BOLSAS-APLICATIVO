module.exports = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'PUT, POST, PATCH, DELETE, GET',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value:
              'Origin, X-Requested-With, Content-Type, Accept, Authorization',
          },
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
        ],
      },
    ];
  },

  reactStrictMode: true,

  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },

  images: {
    domains: [process.env.NEXT_PUBLIC_DOMAIN_URL || 'localhost'],
    unoptimized: true,
  },
};
