const puppeteer = require('puppeteer');
const $ = require('cheerio');
const { db } = require('./firebase');

const CNN_URL = 'https://www.cnn.com/';
const FOX_URL = 'https://www.foxnews.com/';

const getTimestamp = date => {
	const o_date = new Intl.DateTimeFormat('en-US').format(date);
	return o_date.replace(/\//g, '-');
};

const parseCnnHTML = html => {
	const stuff = $(
		'div.zn__containers > div > ul > li > article > div > div > h3',
		html,
	);
	const headlines = stuff.toArray().map(x => $(x).text());
	return headlines;
};

const parseFoxHTML = html => {
	let scraped = $('li.related-item.title-color-default', html);
	const headlines = scraped.toArray().map(x => $(x).text());

	scraped = $('h2.title.title-color-default > a', html);
	const otherHeadlines = scraped.toArray().map(x => $(x).text());
	return [...headlines, ...otherHeadlines];
};

const getCNNContent = async page => {
	await Promise.all([
		page.goto(CNN_URL),
		page.setViewport({
			width: 800,
			height: 600,
		}),
		page.waitForNavigation(),
	]);

	const cnnHTML = await page.content();

	const img = await page.screenshot({ encoding: 'base64' });

	return {
		html: cnnHTML,
		img,
	};
};

const getFoxContent = async page => {
	await Promise.all([
		page.goto(FOX_URL),
		page.setViewport({
			width: 800,
			height: 600,
		}),
		page.waitForNavigation(),
	]);

	const foxHTML = await page.content();

	const img = await page.screenshot({ encoding: 'base64' });

	return {
		html: foxHTML,
		img,
	};
};

const scrape = async () => {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();

	const cnn = await getCNNContent(page);
	const fox = await getFoxContent(page);

	await browser.close();

	const cnnHeadlines = parseCnnHTML(cnn.html);
	const foxHeadlines = parseFoxHTML(fox.html);

	const timestamp = getTimestamp(new Date());

	db.ref('/').push({
		cnnHeadlines,
		foxHeadlines,
		cnnImg: cnn.img,
		foxImg: fox.img,
		timestamp,
	});

	db.ref('/').update({
		lastTimestamp: timestamp,
	});

	return {
		cnnHeadlines,
		foxHeadlines,
		cnnImg: cnn.img,
		foxImg: fox.img,
		timestamp,
	};
};

const getHeadlinesForDate = async date => {
	// const timestamp = getTimestamp(date);

	return await db
		.ref('/')
		.once('value')
		.then(snapshot => {
			let headlines;
			snapshot.forEach(_data => {
				const data = _data.val();
				if (data.timestamp === date) {
					headlines = data;
				}
			});

			return headlines;
		});
};

module.exports = {
	scrape,
	getHeadlinesForDate,
};
