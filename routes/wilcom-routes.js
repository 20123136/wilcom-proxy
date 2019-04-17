var express = require('express');
var router = express.Router();
const config = require('config');
let wilcomproxy = require('./wilcom-http-proxy');

/**
 *************************** 配置相应的路径 start *****************************
 * 示例：
 * 前端地址书写：/apollo/openapi/v1/apps
 * 后端实际地址：/openapi/v1/apps
 * 解释：前端相对于后端的地址，多出来的 apollo 字符串是为了匹配路由，该字符串不会被代理到后端 url 中。
 *      如果要将这类匹配路由的字符串也要拼接到后端 url 中，请在 routes(req, res, url) 方法中设置第三个参数为该字符串或根据实际情况设定该字符串值。
 *
 */

router.use('/security', function (req, res) {
  wilcomproxy(req, res, config.security, req.baseUrl);
})

router.use('/apollo', function (req, res) {
  wilcomproxy(req, res, config.apollo);
})


/**
 *************************** 配置相应的路径 end *****************************
 */







/**
 * 此方法为前端提供配置文件 default.json 中某个服务的所有配置信息。
 */
router.use('/getDefaultJson/:key', function (req, res) {
  res.json(config[req.params.key]);
})


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});


module.exports = router;
