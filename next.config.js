module.exports = {
  webpack: (config, { webpack }) => {
    config.plugins.push(new webpack.IgnorePlugin({resourceRegExp:/.*\.test\.js$/}));
    return config;
  },
  experimental: {
    forceSwcTransforms: true,
  },
  staticPageGenerationTimeout: 1000,
  distDir: 'build/_next',
  target: 'server'
};
