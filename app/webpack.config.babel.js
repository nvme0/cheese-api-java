import webpack from "webpack";
import path from "path";
import BundleAnalyzerPlugin from "webpack-bundle-analyzer";
import { CleanWebpackPlugin } from "clean-webpack-plugin";
import CopyWebpackPlugin from "copy-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import TerserPlugin from "terser-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import Dotenv from "dotenv-webpack";

const PRODUCTION_ENV = process.env.NODE_ENV === "production";
const ENABLE_BUNDLE_ANALYZER = !!process.env.ANALYZE;
const publicPath = process.env.PUBLIC_PATH || "/";
const devServerPort = process.env.PORT || 3000;

module.exports = () => {
  const plugins = [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: "public",
          to: ".",
          globOptions: {
            ignore: ["*.DS_Store"],
          },
        },
      ],
    }),
    new HtmlWebpackPlugin({
      title: "Cheeseria",
      template: "./index.html",
      filename: "index.html",
      minify: PRODUCTION_ENV,
      favicon: "favicon.ico",
      meta: {
        description: "Cheeseria POC",
        viewport: "width=device-width, initial-scale=1",
        "theme-color": "#007DFF",
      },
    }),
    new Dotenv({
      path: ".env",
    }),
  ];

  if (PRODUCTION_ENV) {
    plugins.push(
      new MiniCssExtractPlugin({
        filename: "styles/[name].[contenthash].css",
        chunkFilename: "[id].css",
      }),
    );
    if (ENABLE_BUNDLE_ANALYZER) {
      plugins.push(new BundleAnalyzerPlugin.BundleAnalyzerPlugin());
    }
  } else {
    plugins.push(new webpack.HotModuleReplacementPlugin());
  }

  const alias = {
    "@components": path.resolve(__dirname, "src/components"),
    "@layout": path.resolve(__dirname, "src/layout"),
    "@pages": path.resolve(__dirname, "src/pages"),
    "@utils": path.resolve(__dirname, "src/utils"),
    "@hooks": path.resolve(__dirname, "src/hooks"),
    "@api": path.resolve(__dirname, "src/api"),
    "@app": path.resolve(__dirname, "src"),
  };

  return {
    entry: ["./src/index.tsx"],
    mode: PRODUCTION_ENV ? "production" : "development",
    devtool: PRODUCTION_ENV ? false : "inline-source-map",
    resolve: {
      extensions: [".ts", ".js", ".tsx", ".jsx", ".json"],
      alias: PRODUCTION_ENV
        ? alias
        : {
            "react-dom": "@hot-loader/react-dom",
            ...alias,
          },
    },
    plugins,
    optimization: {
      minimize: PRODUCTION_ENV,
      minimizer: [new TerserPlugin()],
    },
    output: {
      path: path.resolve(__dirname, "build" + publicPath),
      publicPath,
      filename: PRODUCTION_ENV ? "[name].[contenthash].js" : "[name].js",
    },
    devServer: {
      port: devServerPort,
      publicPath,
      hot: true,
      historyApiFallback: {
        index: publicPath + "index.html",
      },
    },
    module: {
      rules: [
        {
          test: /\.(css|scss)$/,
          use: [
            {
              loader: PRODUCTION_ENV ? MiniCssExtractPlugin.loader : "style-loader",
            },
            {
              loader: "css-loader",
              options: {
                importLoaders: PRODUCTION_ENV ? 2 : 1,
                sourceMap: !PRODUCTION_ENV,
              },
            },
            // {
            //   loader: "postcss-loader",
            //   options: { sourceMap: !PRODUCTION_ENV }
            // },
            {
              loader: "sass-loader",
              options: { sourceMap: !PRODUCTION_ENV },
            },
          ],
        },
        {
          test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
          loader: "file-loader",
        },
        {
          test: /\.(gif|png|jpe?g|svg)$/i,
          use: [
            "file-loader",
            {
              loader: "image-webpack-loader",
              options: {
                disable: true, // webpack@2.x and newer
              },
            },
          ],
        },
        {
          test: /\.(ts|tsx)$/,
          exclude: /(node_modules)/,
          loader: "babel-loader",
          options: {
            babelrc: false,
            presets: [
              ["@babel/preset-env", { targets: { browsers: ["last 2 versions"] } }],
              ["@babel/preset-react", { targets: { browsers: ["last 2 versions"] } }],
              "@babel/preset-typescript",
            ],
            plugins: [
              "@babel/plugin-transform-runtime",
              "@babel/plugin-syntax-dynamic-import",
              "react-hot-loader/babel",
              "@babel/plugin-proposal-class-properties",
            ],
          },
        },
      ],
    },
    watchOptions: {
      ignored: /node_modules/,
    },
  };
};
