const router = require('express').Router();

router.get('/', function (req, res, next) {
	const d = new Date();
	const date = `${d.getMonth() + 1}-${d.getDate()}-${d.getUTCFullYear()}`;
	console.log('rendering', date);
	res.render('index', { date: date, title: `News Archive - ${date}` });
	// res.sendFile('index.html');
});

module.exports = router;
