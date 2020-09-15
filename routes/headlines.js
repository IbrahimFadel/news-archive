const router = require('express').Router();

router.get('/:date', function (req, res, next) {
	console.log('rendering page for', req.params.date);
	res.render('index', {
		date: req.params.date,
		title: `News Archive - ${req.params.date}`,
	});
});

module.exports = router;
