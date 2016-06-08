import jsonServer from 'json-server';
import baseConfig from './webpack/config/base';
import devServer from './webpack/server';
import express from 'express';
import expressjwt from 'express-jwt';
import jwt from 'jsonwebtoken';
import bodyParser from 'body-parser';
import httpProxy from 'http-proxy';
import db from './db';

let secret = 'siji!!!';
let jwtCheck = expressjwt({ secret });
let server = jsonServer.create();
let jsonRouter = jsonServer.router( db );
let router = express.Router();
let proxy = httpProxy.createProxyServer({
	target: {
		host: baseConfig.cdnHost,
		port: baseConfig.cdnPort
	}
});

server.use( express.static( __dirname ) );
server.use( jsonServer.defaults() );
server.use( bodyParser.json() );
server.use( bodyParser.urlencoded({ extended: true }) );
server.use( jsonServer.rewriter({
	'/api/category/sg': '/sg',
	'/api/category/sc': '/sc',
	'/api/category/rq': '/rq',
	'/api/category/gg': '/gg',
	'/api/detail/:id': '/detail/:id'
}) );
server.use( '/', router );
server.use( jsonRouter );

router.post('/api/login', ( req, res, next ) => {
	if( req.body.username === 'demo' && req.body.password === 'demo' ){
		res.cookie(
			'token',
			jwt.sign({
				username: 'demo',
				timestamp: Date.now()
			}, secret),
			{
				expires: new Date(Date.now() + 900000),
				httpOnly: true
			}
		).json({
			code: 0
		});
	} else {
		res.json({
			code: -1,
			message: '用户名不存在或者密码错误'
		});
	}
});

router.post('/api/cart/add', ( req, res, next ) => {

});

router.post('/api/cart/subtract', ( req, res, next ) => {

});

// server.use('/dist', ( req, res, next ) => {
// 	proxy.web( req, res );
// });

server.listen(baseConfig.staticPort, () => {
	console.log( `Server Started (port: ${baseConfig.staticPort})` );
});

devServer();
