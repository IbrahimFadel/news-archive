const createError = require('http-errors');
const express = require('express');
const app = express();
const path = require('path');
const PORT = 3000;
const logger = require('morgan');

const indexRouter = require('./routes/index');
const headlinesRouter = require('./routes/headlines');
const scrapeRouter = require('./api/routes/scrape');
const headlinesFromDateRouter = require('./api/routes/getHeadlinesForDate');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));
// app.use('/api', api);

// app.get('/', (req, res) => {
// 	const d = new Date();
// 	const date = `${d.getMonth() + 1}-${d.getDate()}-${d.getUTCFullYear()}`;
// 	console.log('rendering', date);
// 	res.render('index', { date: date });
// });
app.use('/', indexRouter);
app.use('/headlines', headlinesRouter);
app.use('/api/scrape', scrapeRouter);
app.use('/api/headlines', headlinesFromDateRouter);

// app.use(function (req, res, next) {
// 	next(createError(404));
// });

module.exports = app;
