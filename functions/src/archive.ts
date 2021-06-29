import * as puppeteer from "puppeteer";
import * as cheerio from "cheerio";
import { bucket } from "./firebase";

const CNN_URL = "https://www.cnn.com/";
const FOX_URL = "https://www.foxnews.com/";

const getTimestamp = (date: Date) => {
	const oDate = new Intl.DateTimeFormat("en-US").format(date);
	return oDate.replace(/\//g, "-");
};

const parseCnnHTML = (html: string) => {
	const $ = cheerio.load(html);
	const stuff = $(
		"div.zn__containers > div > ul > li > article > div > div > h3",
		html,
	);
	const headlines = stuff.toArray().map(x => $(x).text());
	return headlines;
};

const parseFoxHTML = (html: string) => {
	const $ = cheerio.load(html);
	let scraped = $("li.related-item.title-color-default", html);
	const headlines = scraped.toArray().map(x => $(x).text());

	scraped = $("h2.title.title-color-default > a", html);
	const otherHeadlines = scraped.toArray().map(x => $(x).text());
	return [...headlines, ...otherHeadlines];
};

const getCNNContent = async (page: puppeteer.Page) => {
	await Promise.all([
		page.goto(CNN_URL, { "waitUntil": "networkidle0" }),
		page.setViewport({
			width: 800,
			height: 600,
		}),
		page.waitForNavigation(),
	]);

	const cnnHTML = await page.content();

	const img = await page.screenshot({ encoding: "base64", type: "jpeg" });

	return {
		html: cnnHTML,
		img,
	};
};

const getFoxContent = async (page: puppeteer.Page) => {
	await Promise.all([
		page.goto(FOX_URL, { "waitUntil": "networkidle0" }),
		page.setViewport({
			width: 800,
			height: 600,
		}),
		page.waitForNavigation(),
	]);

	const foxHTML = await page.content();

	const img = await page.screenshot({ encoding: "base64", type: "jpeg" });

	return {
		html: foxHTML,
		img,
	};
};

const writeImage = async (data: Buffer, path: string) => {
	const file = bucket.file(path);
	const options = { resumable: false, metadata: { contentType: "image/jpeg" } };
	await file.save(data, options);
};

// const readImage = async (path: string) => {
// 	const file = bucket.file(path);
// 	try {
// 		return await file.download();
// 	} catch (err) {
// 		throw err;
// 	}
// }


export const scrape = async () => {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();

	const cnn = await getCNNContent(page);
	const fox = await getFoxContent(page);

	await browser.close();

	const cnnHeadlines = parseCnnHTML(cnn.html);
	const foxHeadlines = parseFoxHTML(fox.html);
	const timestamp = getTimestamp(new Date());

	const cnnImageBuffer = Buffer.from(cnn.img as string, "base64");
	writeImage(cnnImageBuffer, `images/CNN-${timestamp}`);
	const foxImageBuffer = Buffer.from(fox.img as string, "base64");
	writeImage(foxImageBuffer, `images/FOX-${timestamp}`);
	// readImage(`images/CNN-${timestamp}`);

	return {
		cnnHeadlines,
		foxHeadlines,
		cnnImg: cnn.img,
		foxImg: fox.img,
		timestamp,
	};
};
