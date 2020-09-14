const createError = require('http-errors');
const express = require('express');
const app = express();
const path = require('path');
const PORT = 3000;

const dev = false;

const indexRouter = require('./routes/index');
const scrapeRouter = require('./api/routes/scrape');
const headlinesFromDateRouter = require('./api/routes/getHeadlinesForDate');

app.use(express.static(path.join(__dirname, 'public')));
// app.use('/api', api);

app.use('/', indexRouter);
app.use('/api/scrape', scrapeRouter);
app.use('/api/headlines', headlinesFromDateRouter);

app.use(function (req, res, next) {
	next(createError(404));
});

module.exports = app;
