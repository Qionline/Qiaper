const CracoLessPlugin = require('craco-less');
const CracoAlias = require("craco-alias");

const WebpackBar = require("webpackbar")

// dev
process.env.BROWSER = "none"
process.env.PORT = 4701
// prod
process.env.GENERATE_SOURCEMAP = false

const webpack = require('webpack');

module.exports = {
  webpack: {
    plugins: [new WebpackBar({ name: "Qiaper", profile: true }), new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer'],
    })],
    configure: {
      resolve: {
        fallback: {
          buffer: require.resolve('buffer'),
        },
      },
    },
  },
  babel: {
    plugins: [
      ["@babel/plugin-proposal-decorators", { legacy: true }]
    ],
  },
  plugins: [
    {
      plugin: CracoAlias,
      options: {
        source: "options",
        baseUrl: "./",
        aliases: {
          "@": "./src",
        }
      }
    },
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { '@primary-color': '#e07300' },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
}
