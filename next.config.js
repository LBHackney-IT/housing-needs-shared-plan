module.exports = {
  webpack: (
    config,
    { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }
  ) => {
    // Important: return the modified config
    return config
  },
  experimental: {
    forceSwcTransforms: true,
  },
  distDir: 'build/_next',
  target: 'server'
};
