const path = require('path')

module.exports = function override(config) {
  //do stuff with the webpack config...
  // if(config && config.resolve && config.resolve.alias) {
  //   config.resolve.alias['joi'] = 'joi-browser'
  // }
  if(config && config.resolve) {
    const srcPath = path.resolve(__dirname, 'src')
    if (config.resolve.modulesDirectories && config.resolve.modulesDirectories.constructor === Array) {
      config.resolve.modulesDirectories.shift(srcPath)
    } else {
      config.resolve.modulesDirectories = [srcPath, 'node_modules']
    }
  }
  return config
}
