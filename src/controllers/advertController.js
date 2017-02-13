import advertModel from '../models/advertModel';
import formidable from 'formidable';
import config from '../config';
import { basename } from 'path';

//展示广告新增页面
export function showAddPage(req, res, next) {
    res.render('advert_add.html');
}
//展示广告管理页
export function showListPage(req, res, next) {
    const page = Number.parseInt(req.query.page, 10);
    const pageSize = 5;
    advertModel
        .find()
        .skip((page - 1) * pageSize)
        .limit(pageSize)
        .exec((err, adverts) => {
            if (err) {
                return next(err);
            }
           advertModel.count((err,count)=>{
            if(err){
                return next(err);
            }
            const totalPage = Math.ceil(count/pageSize);
             res.render('advert_list.html', {
                adverts,
                totalPage,
                page
            });
           });
        });
}
//add广告
export function addAdvert(req, res, next) {
    const form = new formidable.IncomingForm();
    form.uploadDir = config.uploadDir;
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return next(err);
        }
        const body = fields;
        body.image = basename(files.image.path);
        const advert = new advertModel({
            title: body.title,
            image: body.image,
            link: body.link,
            start_time: body.start_time,
            end_time: body.end_time
        });
        advert.save((err, result) => {
            if (err) {
                return next(err);
            }
            res.json({
                err_code: 0
            });
        });
    });
}

//查询广告数据
export function queryAdvert(req, res, next) {
    advertModel.find((err, result) => {
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
    advertModel.findById(req.params.advertId, (err, result) => {
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
    advertModel.findById(req.body.id, (err, advert) => {
        if (err) {
            return next(err);
        }
        const body = req.body;
        advert.title = body.title;
        advert.image = body.image;
        advert.link = body.link;
        advert.start_time = body.start_time;
        advert.end_time = body.end_time;
        advert.last_modified = Date.now();

        advert.save((err, result) => {
            if (err) {
                return next(err);
            }
            res.json({
                err_code: 0
            });
        });
    });
}

//删除
export function removeAdvert(req, res, next) {
    advertModel.remove({ _id: req.params.advertId }, err => {
        if (err) {
            return next(err);
        }
        res.json({
            err_code: 0
        });
    });
}
