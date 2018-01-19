const webpack = require('webpack')
const CheckerPlugin = require('awesome-typescript-loader').CheckerPlugin
const path = require('path');
module.exports = (storybookBaseConfig, configType) => {
  storybookBaseConfig.module.rules.push({
    test: /\.tsx?$/,
    loader: "awesome-typescript-loader",
    options: {
      useCache: true
    }
  });

  storybookBaseConfig.module.rules.push({
    enforce: "pre",
    test: /\.js$/,
    loader: "source-map-loader"
  });

  storybookBaseConfig.plugins.push(new CheckerPlugin());
  storybookBaseConfig.plugins.push(new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(configType)
  }));

  // Return the altered config
  return storybookBaseConfig;
};