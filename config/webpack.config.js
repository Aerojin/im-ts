const path = require("path");
const webpack = require("webpack");

const config = {
  // ...现有配置
  output: {
    // ...现有配置
    globalObject: "this",
  },
  // ...现有配置
  plugins: [
    // ...现有插件
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
    }),
    // Adds a banner to the top of each generated chunk
    // Prevents this error: https://github.com/webpack/webpack/issues/6522
    new webpack.BannerPlugin({
      banner: () => {
        return `
          if (global.ZingTouch && global.ZingTouch.register) {
            global.ZingTouch.register(window);
          }
        `;
      },
      raw: true,
      entryOnly: true,
    }),
    // 添加UMD支持
    ...(process.env.BUILD_UMD
      ? [
          new webpack.optimize.UglifyJsPlugin({
            compress: {
              warnings: false,
              comparisons: false,
            },
            mangle: {
              safari10: true,
            },
            output: {
              comments: false,
              ascii_only: true,
            },
            sourceMap: false,
          }),
          new webpack.DefinePlugin({
            "process.env.NODE_ENV": JSON.stringify("production"),
          }),
          new webpack.LoaderOptionsPlugin({
            minimize: true,
          }),
        ]
      : []),
  ],
  // ...现有配置
};

// 如果是UMD构建，则添加一个新的输出配置
if (process.env.BUILD_UMD) {
  config.output.path = path.resolve(__dirname, "umd");
  config.output.libraryTarget = "umd";
  config.output.filename = "index.min.js";
}

module.exports = config;
