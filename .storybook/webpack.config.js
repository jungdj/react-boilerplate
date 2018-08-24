const path = require("path");
const webpack = require('webpack')
//const ModuleReplaceWebpackPlugin = require('module-replace-webpack-plugin');

// Export a function. Accept the base config as the only param.
module.exports = (storybookBaseConfig, configType) => {
	// configType has a value of 'DEVELOPMENT' or 'PRODUCTION'
	// You can change the configuration based on that.
	// 'PRODUCTION' is used when building the static version of storybook.

	// Make whatever fine-grained changes you need
	//storybookBaseConfig.plugins[3].definitions["process.env"].REACT_APP_PROXY = '"http://localhost:3001"'
	storybookBaseConfig.module.rules.push({
		test: /\.css$/,
		loaders: [
			{
				loader: 'style-loader',
			},
			{
				loader: 'css-loader',
				options: {
					sourceMap: true,
				},
			},
		],
	},{
		test: /\.scss$/,
		loaders: ["style-loader", "css-loader", "sass-loader"],
		include: path.resolve(__dirname, "../src")
	}, {
		test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/, /\.svg$/],
		loader: 'url-loader',
		include: path.resolve(__dirname, "../src/static")
		//options: {
		//	limit: 10000,
		//	name: 'static/media/[name].[hash:8].[ext]',
		//},
	}, {
		// Exclude `js` files to keep "css" loader working as it injects
		// its runtime that would otherwise processed through "file" loader.
		// Also exclude `html` and `json` extensions so they get processed
		// by webpacks internal loaders.
		exclude: [/\.(js|jsx|mjs)$/, /\.html$/, /\.json$/],
		loader: 'file-loader',
		include: path.resolve(__dirname, "../src/static"),
		//options: {
		//	name: 'static/media/[name].[hash:8].[ext]',
		//},
	});

	//storybookBaseConfig.plugins.push(
	//	new webpack.NormalModuleReplacementPlugin(/(.*)\.container(\.*)/, function(resource) {
	//		resource.request = resource.request.replace(/\.container/, '');
	//	})
	//)


	// Return the altered config
	return storybookBaseConfig;
};