const os = require('os');

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      webpackConfig.resolve.fallback = {
        ...webpackConfig.resolve.fallback,
        os: require.resolve('os-browserify/browser'),
      };
      return webpackConfig;
    },
  },
};
