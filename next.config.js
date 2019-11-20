/* eslint-disable import/no-extraneous-dependencies, no-empty, global-require */
let withBundleAnalyzer = config => config;
try {
  withBundleAnalyzer = require('@zeit/next-bundle-analyzer');
} catch (error) {}

const handleWebpackConfig = require('./config/webpack.js');

module.exports = withBundleAnalyzer({
  analyzeServer: ['server', 'both'].includes(process.env.BUNDLE_ANALYZE),
  analyzeBrowser: ['browser', 'both'].includes(process.env.BUNDLE_ANALYZE),
  bundleAnalyzerConfig: {
    server: {
      analyzerMode: 'static',
      reportFilename: '../analyze/server.html',
    },
    browser: {
      analyzerMode: 'static',
      reportFilename: '../analyze/client.html',
    },
  },
  distDir: '../.next',
  webpack: handleWebpackConfig,
});
