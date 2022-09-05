module.exports = {
  /**
 * @type {import('next').NextConfig}
 */
  
  webpack: (config, { webpack }) => {
    config.plugins.push(new webpack.IgnorePlugin({resourceRegExp:/.*\.test\.js$/}));
    return config;
  },
  experimental: {
    forceSwcTransforms: true,
  },
  distDir: 'build/_next',
};
