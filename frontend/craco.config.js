// craco.config.js
module.exports = {
    webpack: {
      configure: (webpackConfig) => {
        webpackConfig.module.rules.push({
          test: /\.js$/,
          enforce: 'pre',
          use: ['source-map-loader'],
          exclude: /node_modules\/@antv\/util\/esm/,
        });
  
        webpackConfig.ignoreWarnings = [
          (warning) =>
            warning.module &&
            warning.module.resource.includes('node_modules/@antv/util/esm/path'),
        ];
  
        return webpackConfig;
      },
    },
  };
  