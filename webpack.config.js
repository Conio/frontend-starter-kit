require('dotenv').config()
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const CheckerPlugin = require('awesome-typescript-loader').CheckerPlugin
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

console.log(process.env.SERVER_PORT)

module.exports = {
  entry: "./src/index.tsx",
  output: {
    filename: "bundle.js",
    path: __dirname + "/dist"
  },

  // Enable sourcemaps for debugging webpack's output.
  devtool: "source-map",

  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: [".ts", ".tsx", ".js", ".json"],
  },

  module: {
    rules: [
      // All files with a '.ts' or '.tsx' extension will be handled by awesome-typescript-loader'.
      {
        test: /\.tsx?$/,
        loader: "awesome-typescript-loader",
        options: {
          useCache: true
        }
      },

      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      {
        enforce: "pre",
        test: /\.js$/,
        loader: "source-map-loader"
      }
    ]
  },

  plugins: [
    new CheckerPlugin(),
    new UglifyJsPlugin({
      cache: true,
      parallel: true,
      sourceMap: true
    }),
    new BrowserSyncPlugin({
      // browse to http://localhost:3000/ during development,
      // ./public directory is being served
      host: 'localhost',
      ui: false,
      proxy: "localhost:" + process.env.SERVER_PORT,
      serveStatic: [{
        route: '/assets',
        dir: 'dist'
      }]
    })
  ]
};