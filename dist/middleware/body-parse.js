'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _querystring = require('querystring');

var _querystring2 = _interopRequireDefault(_querystring);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var data = '';

exports.default = function (req, res) {
    (function (req, res, next) {
        req.on('data', function (chunk) {
            data += chunk;
        });
        req.on('end', function () {
            console.log(data);
            req.body = _querystring2.default.parse(data);
            next();
        });
    });
};