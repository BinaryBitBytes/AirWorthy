import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  mode: "development",
  entry: "../client/src/index.jsx",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "app.jsx",
  },
  module: {
    rules: [
      {
        // test: /\.{js|mjs|jsx}$/,
        test: /\.(js|mjs|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
    ],
  },
  devServer: {
    allowedHosts: ["localhost"],
  },
};
