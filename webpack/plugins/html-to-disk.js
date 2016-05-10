import fs from 'fs';

export default class HtmlToDiskPlugin {
	constructor( options={} ){
		this.options = options;
	}
	apply( compiler ){
		compiler.plugin('compilation', function( compilation ){
			compilation.plugin('html-webpack-plugin-after-html-processing', function (data, callback) {
				fs.writeFile('index.html', data.html, {
					encoding: 'utf8'
				});
				callback();
			});
		});
	}
}
