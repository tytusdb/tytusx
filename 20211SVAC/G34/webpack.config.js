const path = require("path");

module.exports = {
  entry: {
    index: "./index.ts",
    codemirror: "./Library/CodeMirror/codemirror.js",
    viz: "./Library/viz/viz.js",
  },
  mode: "production",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    fallback: {
      fs: false,
      path: false,
      crypto: false,
    },
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "script"),
  },
  devServer: {
    contentBase: path.join(__dirname, "./"),
    compress: true,
    port: 8080,
  },
};
