const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const miniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = (_, argv) => {
	const isProduction = argv.mode === "production";

	return {
		entry: "./src/index.js",

		output: {
			path: path.resolve(__dirname, "build"),
			filename: isProduction ? "[name].[contenthash].js" : "[name].js",
			clean: true,
		},

		module: {
			rules: [
				{
					test: /\.html$/,
					use: "html-loader",
				},
				{
					test: /\.css$/,
					use: [isProduction ? miniCssExtractPlugin.loader : "style-loader", "css-loader"],
				},
				{
					test: /\.(png|svg|jpe?g|ico|gif|webp)$/i,
					type: "asset/resource",
					generator: {
						filename: "images/[hash][ext][query]",
					},
				},
				{
					test: /\.(woff(2)?|eot|ttf|otf)$/,
					type: "asset/resource",
					generator: {
						filename: "fonts/[hash][ext][query]",
					},
				},
			],
		},

		plugins: [
			new HtmlWebpackPlugin({
				template: "./src/index.html",
				filename: "index.html",
				favicon: "./src/assets/images/favicon-32x32.png",
				minify: isProduction,
			}),
			new miniCssExtractPlugin({
				filename: isProduction ? "[name].[contenthash].css" : "[name].css",
			}),
			new CopyPlugin({
				patterns: [
					{ from: "src/data.json", to: "data.json" },
					{ from: "src/assets", to: "assets", globOptions: { ignore: ["**/images/favicon-32x32.png", "**/fonts/**"] } },
				],
			}),
		],

		devtool: isProduction ? false : "inline-source-map",

		devServer: {
			static: {
				directory: path.join(__dirname, "build"),
			},
			compress: true,
			port: 9000,
			open: true,
			hot: true,
			watchFiles: ["src/**/*"],
		},
	};
};
