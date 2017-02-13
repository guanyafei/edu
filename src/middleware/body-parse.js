import queryString from 'querystring';
//解析post请求

export default (req, res, next) => {
    if (req.method.toLowerCase() === 'get') {
        return next();
    }
    if (req.headers['content-type'].startsWith('multipart/form-data')) {
        return next();
    }
    let data = '';
    req.on('data', chunk => {
        data += chunk;
    });
    req.on('end', () => {
        req.body = queryString.parse(data);
        next();
    });
};
