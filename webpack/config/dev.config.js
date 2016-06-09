import ExtractTextPlugin from 'extract-text-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import autoprefixer from 'autoprefixer';
import webpack from 'webpack';
import path from 'path';
import _ from 'lodash';
import promise from 'es6-promise';
import baseConfig from './base';
import HtmlToDiskPlugin from '../plugins/html-to-disk';

promise.polyfill();

const cwd = process.cwd();

const config = {
	devtool: 'source-map',
	entry: {
		"app": [
			`webpack-dev-server/client?http://${baseConfig.cdnHost}:${baseConfig.cdnPort}`,
			'babel-polyfill',
			path.resolve( cwd, 'src/app.js' )
		]
	},
	output: {
		path: path.resolve( cwd, baseConfig.distPath ),
		filename: '[name]-[hash:8].js',
		chunkFilename: '[name]-[hash:8].js',
		publicPath: `//${baseConfig.cdnHost}:${baseConfig.cdnPort}/${baseConfig.cdnPath}/`
	},
	context: cwd,
	module: {
		preLoaders: [
			{
				test: /\.tag$/,
				exclude: /node_modules/,
				loader: 'riotjs-loader',
				query: { type: 'none' }
			}
		],
		loaders: [
			{
				test: /\.(jpg|jpeg|png|gif)$/,
				exclude: /node_modules/,
				loader: `url-loader?limit=10240&name=images/[path][name].[ext]?[hash:8]&context=` + path.resolve( cwd, 'src/assets/images' )
			},
			{
				test: /\.(ttf|woff|eot|svg)$/,
				exclude: /node_modules/,
				loader: `url-loader?limit=10240&name=font/[path][name].[ext]?[hash:8]&context=` + path.resolve( cwd, 'src/assets/font' )
			},
			{
				test: /\.(js|tag)$/,
				exclude: /node_modules/,
				loader: 'babel-loader'
			},
			{
				test: /\.(css|less)$/,
				include: path.resolve( cwd, 'src' ),
				exclude: /node_modules/,
				loader: ExtractTextPlugin.extract('style-loader', 'css-loader?localIdentName=[name]-[local]-[hash:base64:5]!postcss-loader!less-loader')
			}
		],
		noParse: []
	},
	resolve: {
		alias: {
			image: path.resolve( cwd, 'src/assets/images' ),
			page: path.resolve( cwd, 'src/container' ),
			ui: path.resolve( cwd, 'src/component' ),
			store: path.resolve( cwd, 'src/store' ),
			api: path.resolve( cwd, 'src/api' ),
			util: path.resolve( cwd, 'src/util' )
		},
		extensions: [ '', '.js', '.tag', '.less', '.css' ]
	},
	plugins: [
		new webpack.DefinePlugin({
			__DEV__: true
		}),
		new webpack.ProvidePlugin({
			riot: 'riot',
			// http://mts.io/2015/04/08/webpack-shims-polyfills/
			fetch: 'imports?this=>global!exports?global.fetch!whatwg-fetch'
		}),
		new ExtractTextPlugin(
			'app-[hash:8].css',
			// including css from lazyload page
			{
				allChunks: true
			}
		),
		new HtmlWebpackPlugin({
			template: path.resolve( cwd, '_index.html' ),
			inject: true
		}),
		new HtmlToDiskPlugin(),
	],
	postcss: () => {
		return [
			autoprefixer({
				browsers: [ 'last 2 versions' ]
			})
		]
	}
}

export default config;
