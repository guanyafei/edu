const nunjucks = require('nunjucks');

nunjucks.configure({autoescape: true});
const res=nunjucks.renderString('Hello {{ username }}',{ username: 'aaa'});

console.log(res);