import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import webpackDevConfig from '../config/dev.config';
import baseConfig from '../config/base';

export default () => {
	let compiler = webpack( webpackDevConfig );
	let server = new WebpackDevServer(
		compiler,
		{
			noInfo: true,
			quiet: false,
			watchOptions: {
				aggregateTimeout: 300,
				poll: 1000
			},
			stats: {
				color: true
			},
			publicPath: `//${baseConfig.cdnHost}:${baseConfig.cdnPort}/${baseConfig.cdnPath}`,
			headers: {
				'Access-Control-Allow-Origin': '*'
			}
		}
	)

	server.listen(baseConfig.cdnPort, () => {
		console.log( `devServer Started（port:${baseConfig.cdnPort}）` );
	});
};
