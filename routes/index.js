const router = require('express').Router();

router.get('/', function(req, res, next) {
	res.sendFile('index.html');
});

module.exports = router;