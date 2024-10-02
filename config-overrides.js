const {override, fixBabelImports, overrideDevServer, watchAll} = require('customize-cra')
const packageName = 'im';
 
module.exports = {
 
  'webpack': override(
    (config) => {
      config.output = config.output || {}
      config.output.library = `${packageName}-[name]`
      config.output.libraryTarget = 'umd'
    //   config.output.jsonpFunction = `webpackJsonp_${packageName}`
      config.output.library.name = `webpackJsonp_${packageName}`
      return config
    },
 
    fixBabelImports('import', {
      libraryName: 'antd',
      libraryDirectory: 'es',
      style: true,
    }),
 
    // addLessLoader({
    //   javascriptEnabled: true,
    //   modifyVars: {
    //     'primary-color': '#1DA57A',
    //     'link-color': '#1DA57A',
    //     'border-radius-base': '2px',
    //   },
    // })
  ),
 
//   'devServer': overrideDevServer(
//     (config) => {
//       config.headers = config.headers || {}
//       config.headers['Access-Control-Allow-Origin'] = '*'
//       return config
//     },
//     watchAll()
//   )
 
}
 
// module.exports = override(
//   fixBabelImports('import', {
//     libraryName: 'antd',
//     libraryDirectory: 'es',
//     style: true,
//   }),
//   addLessLoader({
//     javascriptEnabled: true,
//     modifyVars: {
//       'primary-color': '#1DA57A',
//       'link-color': '#1DA57A',
//       'border-radius-base': '2px',
//     },
//   })
// )