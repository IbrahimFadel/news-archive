import * as functions from "firebase-functions";
import { scrape } from "./archive";

const archiveRuntimeOpts: functions.RuntimeOptions = {
	timeoutSeconds: 300,
	memory: "1GB",
};

export const archive = functions.runWith(archiveRuntimeOpts).https.onRequest(async (req: functions.https.Request, res) => {
	functions.logger.info("Beginning Archive 🚀");
	const data = await scrape();
	functions.logger.info("Archive Done!", data);
	res.send(data);
});

// Run every day at 6pm (18:00)
export const dailyArchive = functions.runWith(archiveRuntimeOpts).pubsub.schedule("0 18 * * *").timeZone("America/New_York").onRun(async ctx => {
	functions.logger.info("Beginning Daily Archive 🚀");
	const data = await scrape();
	functions.logger.info("Daily Archive Done!", data);
	return null;
});
