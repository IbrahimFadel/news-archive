const router = require('express').Router();
const { scrape } = require('../index');

router.get('/', function (req, res, next) {
	const data = scrape();
	data.then(json => res.send(json));
});

module.exports = router;
