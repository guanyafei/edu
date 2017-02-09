import express from 'express';
import config from './config';
import nunjucks from 'nunjucks';
import router from './router';
import queryString from 'querystring';

const app = express();

app.use('/node_modules', express.static(config.node_modules_path));
app.use('/public', express.static(config.public_path));
//配置模板引擎
nunjucks.configure('./views', {
    autoescape: true,
    express: app
});
/*app.set('views', config.viewPath);
app.engine('.html', require('ejs').__express);
app.set('view engine', 'html');*/
//解析请求数据
let data = '';
app.use((req, res, next) => {
    req.on('data', chunk => {
        data += chunk;
    });
    req.on('end', () => {
        console.log(data);
        req.body = queryString.parse(data);
        next();
    });
});

//挂载路由
app.use(router);


app.listen(3000, () => {
    console.log('server is running at port 3000...');
});
