import { Manager } from '../models';
//展示注册页面
export function showRegister(req, res, next) {
    res.render('register.html');
}
//注册
export function doRegister(req, res, next) {
    const { username, password, email } = req.body;
    Manager
        .findOne({
            username
        })
        .then(result => {
            if (result) {
                return res.json({
                    err_code: 1,
                    message: '用户名被占用'
                });
            }
            const manager = new Manager({
                username,
                password,
                email
            });
            return manager.save();
        })
        .then(result => {
            res.json({
                err_code: 0
            });
        }).catch(err => {
            next(err);
        });
}

//登陆页
export function showLogin(req, res, next) {
    // res.render('login.html', {
    //     username: req.cookies.username
    // });
     res.render('login.html');
}

//登陆
export function doLogin(req, res, next) {
    const { username, password } = req.body;
    Manager
        .findOne({
            username: username
        })
        .then(manager => {
            if (!manager) {
                return res.json({
                    err_code: 1,
                    message: '用户不存在'
                });
            }
            if (password !== manager.password) {
                return res.json({
                    err_code: 1,
                    message: '密码不正确'
                });
            }
            req.session.manager = manager;
            res.json({
                err_code: 0
            });
        })
}
