module.exports = {
  images: {
    domains: ['ipfs.io', 'cloudflare-ipfs.com'],
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.md$/,
      use: 'raw-loader',
    });
    return config;
  }
};
