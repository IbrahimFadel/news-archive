const router = require('express').Router();
const { getHeadlinesForDate } = require('../index');

router.get('/:date', (req, res, next) => {
	const date = new Date(JSON.parse(req.params.date));
	const headlines = getHeadlinesForDate(date);
	headlines.then(data => {
		res.send(data);
	});
});

module.exports = router;
