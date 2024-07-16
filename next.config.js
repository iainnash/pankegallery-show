module.exports = {
  images: {
    domains: ['cloudflare-ipfs.com'],
    remotePatterns: [{hostname: 'cloudflare-ipfs.com'}]
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.md$/,
      use: 'raw-loader',
    });
    return config;
  }
};
