export function showIndex(req, res) {
	if(!req.session.manager){
		return res.redirect('/advert/login');
	}
    res.render('index.html', {
        manager: req.session.manager
    });
}
