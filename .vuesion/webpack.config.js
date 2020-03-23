/**
 * modify webpack config
 * @param {webpack.Configuration} config - webpack config
 * @param {string} target - build target, can  be "client" or "server"
 * @returns {*}
 */
const isProd = process.env.NODE_ENV === 'production';

module.exports = (config, target) => {
  console.log(config);
  // "resolve": {
  //   "extensions": [".mjs", ".js", ".jsx"]
  // }
  let configureWebpack = {
    resolve: {
      // .mjs needed for https://github.com/graphql/graphql-js/issues/1272
      extensions: ['*', '.mjs', '.js', '.vue', '.json', '.gql', '.graphql']
    },
    module: {
      rules: [ // fixes https://github.com/graphql/graphql-js/issues/1272
        {
          test: /\.mjs$/,
          include: /node_modules/,
          type: 'javascript/auto'
        }
      ]
    }
  };
  config.module.rules = config.module.rules.concat(configureWebpack.module.rules);
  // config.resolve.extensions = configureWebpack.resolve.extensions;
  if (target === 'client' && isProd) {
    console.log(config);
    config.performance = {
      hints: 'warning',
      maxEntrypointSize: 400000,
      maxAssetSize: 300000,
    };
    // config.rules.push({
    //   test: /\.mjs$/,
    //   include: /node_modules/,
    //   type: "javascript/auto"
    // })

  }

  return config;
};
