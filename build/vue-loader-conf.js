const utils = require('./utils')
const config = require('../config')
const _ = require('lodash');
const isProduction = process.env.NODE_ENV === 'production'

const loaders = _.extend(utils.cssLoaders({
  sourceMap: isProduction
  ? config.build.productionSourceMap
  : config.dev.cssSourceMap,
  extract: isProduction
}));

module.exports = {
  loaders,
  transformToRequire: {
    video: 'src',
    source: 'src',
    img: 'src',
    image: 'xlink:href'
  }
}
