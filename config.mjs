import path from "path";
import { fileURLToPath } from "url";
import HtmlWebpackPlugin from "html-webpack-plugin";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const isRunningWebpack = !!process.env.WEBPACK;
const isRunningRspack = !!process.env.RSPACK;
if (!isRunningRspack && !isRunningWebpack) {
  throw new Error("Unknown bundler");
}

/**
 * @type {import('webpack').Configuration | import('@rspack/cli').Configuration}
 */
const config = {
  mode: "development",
  devtool: false,
  entry: {
    main: "./src/main",
    b: "./src/b",
  },
  plugins: [new HtmlWebpackPlugin()],
  output: {
    clean: true,
    path: isRunningWebpack
      ? path.resolve(__dirname, "webpack-dist")
      : path.resolve(__dirname, "rspack-dist"),
    filename: "[name].js",
  },
  experiments: {
    css: true,
  },
  optimization: {
    splitChunks: {
      chunks: "all",
      cacheGroups: {
        styles: {
          name: "styles",
          minSize: 0,
          test: /\.css$/,
          chunks: "all",
          priority: 99,
        },
        "lib-lodash": {
          test: /[\\/]node_modules[\\/](lodash|lodash-es)[\\/]/,
          priority: 0,
          name: "lib-lodash",
          reuseExistingChunk: true,
        },
        "lib-axios": {
          test: /[\\/]node_modules[\\/](axios|axios-.+)[\\/]/,
          priority: 0,
          name: "lib-axios",
          reuseExistingChunk: true,
        },
        "lib-polyfill": {
          test: /[\\/]node_modules[\\/](tslib|core-js|@babel\/runtime|@swc\/helpers)[\\/]/,
          priority: 0,
          name: "lib-polyfill",
          reuseExistingChunk: true,
        },
        "lib-react": {
          test: /[\\/]node_modules[\\/](react|react-dom|scheduler)[\\/]/,
          priority: 0,
          name: "lib-react",
          reuseExistingChunk: true,
        },
        "lib-router": {
          test: /[\\/]node_modules[\\/](react-router|react-router-dom|history|@remix-run[\\/]router)[\\/]/,
          priority: 0,
          name: "lib-router",
          reuseExistingChunk: true,
        },
      },
    },
  },
};

export default config;
