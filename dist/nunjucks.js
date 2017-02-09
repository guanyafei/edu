'use strict';

var nunjucks = require('nunjucks');

nunjucks.configure({ autoescape: true });
var res = nunjucks.renderString('Hello {{ username }}', { username: 'aaa' });

console.log(res);