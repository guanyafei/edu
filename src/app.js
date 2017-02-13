import express from 'express';
import config from './config';
import nunjucks from 'nunjucks';
import indexRouter from './routes/indexRouter';
import managerRouter from './routes/managerRouter';
import advertRouter from './routes/advertRouter';
import bodyParse from './middleware/body-parse';
import errLog from './middleware/err-log';

const app = express();

app.use('/node_modules', express.static(config.node_modules_path));
app.use('/public', express.static(config.public_path));
//配置模板引擎
nunjucks.configure('./views', {
    autoescape: true,
    express: app,
    noCache: true
});
/*app.set('views', config.viewPath);
app.engine('.html', require('ejs').__express);
app.set('view engine', 'html');*/

//解析请求数据
app.use(bodyParse);

//挂载路由
app.use(indexRouter);
app.use(advertRouter);
app.use(managerRouter);
//处理错误
app.use(errLog);

app.listen(3000, () => {
    console.log('server is running at port 3000...');
});
