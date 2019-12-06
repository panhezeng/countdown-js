const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const shell = require("shelljs");

const outputPath = path.resolve(__dirname, "../docs");

const config = {
  output: {
    path: outputPath
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules|dist/,
        use: "babel-loader"
      }
    ]
  },
  resolve: {
    extensions: [".js", ".json", ".jsx", ".css"]
  },
  externals: {
    react: "React",
    "react-dom": "ReactDOM"
  },
  plugins: []
};

module.exports = (env, argv) => {
  const HtmlWebpackPluginOptions = {
    script: "development",
    template: "index.html"
  };
  if (argv.mode === "production") {
    shell.rm("-rf", outputPath);
    HtmlWebpackPluginOptions.script = "production.min";
  }
  config.plugins.push(new HtmlWebpackPlugin(HtmlWebpackPluginOptions));
  return config;
};
