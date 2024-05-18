const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
	module: {
		rules: [
			// {
			// 	test: /\.js$/,
			// 	exclude: /node_modules/,
			// 	use: {
			// 		loader: "babel-loader",
			// 	},
			// },
			{
				test: /\.(j|t)s$/,
				use: [{ loader: "babel-loader" }],
			},
			// {
			// 	test: /\.css$/i,
			// 	use: ["style-loader", "css-loader"],
			// },
			{
				test: /\.css$/i,
				use: ["style-loader", "css-loader"],
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			inject: "body",
			template: "./public/index.html",
			filename: "./index.html",
		}),
	],
};
