'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

var _nunjucks = require('nunjucks');

var _nunjucks2 = _interopRequireDefault(_nunjucks);

var _router = require('./router');

var _router2 = _interopRequireDefault(_router);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

app.use('/node_modules', _express2.default.static(_config2.default.node_modules_path));
app.use('/public', _express2.default.static(_config2.default.public_path));
//配置模板引擎
_nunjucks2.default.configure('./views', {
    autoescape: true,
    express: app
});
/*app.set('views', config.viewPath);
app.engine('.html', require('ejs').__express);
app.set('view engine', 'html');*/
//解析请求数据
var data = '';
app.use(function (req, res, next) {
    req.on('data', function (chunk) {
        data += chunk;
    });
    req.on('end', function () {
        console.log(data);
    });
});

//挂载路由
app.use(_router2.default);

app.listen(3000, function () {
    console.log('server is running at port 3000...');
});