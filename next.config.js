module.exports = {
  images: {
    domains: ['ipfs.io'],
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.md$/,
      use: 'raw-loader',
    });
    return config;
  },
  future: {
    webpack5: true,
  },
};
