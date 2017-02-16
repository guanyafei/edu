import {Advert} from '../models';
import formidable from 'formidable';
import config from '../config';
import { basename } from 'path';
import moment from 'moment';


//分页
export function paginationAdvert(req, res, next) {
    Advert.count((err, count) => {
        if (err) {
            return next(err);
        }
        res.json({
            err_code: 0,
            result: count
        });
    });
}
//展示广告新增页面
export function showAddPage(req, res, next) {
    res.render('advert_add.html');
}
//展示广告管理页
export function showListPage(req, res, next) {
    res.render('advert_list.html');
}
//add广告
export function addAdvert(req, res, next) {
    promiseFor(req)
        .then((result) => {
            const [fields, files] = result;
            const body = fields;
            body.image = basename(files.image.path);
            const advert = new Advert({
                title: body.title,
                image: body.image,
                link: body.link,
                start_time: body.start_time,
                end_time: body.end_time
            });
            return advert.save();
        }).then(result => {
            res.json({
                err_code: 0
            });
        })
        .catch(err => {
            next(err);
        });
}

//查询广告数据
export function queryAdvert(req, res, next) {
    let { page, pageSize } = req.query;
    page = Number.parseInt(page);
    pageSize = Number.parseInt(pageSize);
    Advert
        .find()
        .where('start_time').lt(new Date())
        .where('end_time').gt(new Date())
        .skip((page - 1) * pageSize)
        .limit(pageSize)
        .exec((err, result) => {
            if (err) {
                return next(err);
            }
            res.json({
                err_code: 0,
                result: result
            });
        });
}

//模糊匹配
export function likeFind(req, res, next) {
    Advert.findById(req.params.advertId, (err, result) => {
        if (err) {
            return next(err);
        }
        res.json({
            err_code: 0,
            result: result
        });
    });
}

//编辑
export function editAdvert(req, res, next) {
   const body = {};
  promiseFor(req)
    .then(result => {
      body.fields = result[0];
      body.files = result[1];
      return Advert.findById(body.fields.id);
    })
    .then(advert => {
        console.log(advert);
      advert.title = body.fields.title;
      advert.link = body.fields.link;
      advert.start_time = body.fields.start_time;
      advert.end_time = body.fields.end_time;
      advert.last_modified = Date.now();
      if (body.files.image.size !== 0) {
        advert.image = basename(body.files.image.path);
      }
      return advert.save();
    })
    .then(result => {
      res.json({
        err_code: 0
      });
    })
    .catch(err => {
      next(err);
    });
}
//展示编辑
export function showEditPage(req, res, next) {
    Advert.findById({ _id: req.params.advertId }, (err, advert) => {
        if (err) {
            return next(err);
        }
        res.render('advert_edit.html', {
            advert,
            moment
        });
    });
}
//删除
export function removeAdvert(req, res, next) {
    Advert.remove({ _id: req.params.advertId }, err => {
        if (err) {
            return next(err);
        }
        res.json({
            err_code: 0
        });
    });
}


function promiseFor(req) {
    return new Promise((resolve, reject) => {
        const form = new formidable.IncomingForm();
        form.uploadDir = config.uploadDir;
        form.keepExtensions = true;
        form.parse(req, (err, fields, files) => {
            if (err) {
                reject(err);
            }
            resolve([fields, files]);
        });
    });
}
