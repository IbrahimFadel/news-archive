import * as admin from "firebase-admin";

admin.initializeApp({
	credential: admin.credential.applicationDefault(),
	storageBucket: "gs://us-news-archive.appspot.com",
});

export const bucket = admin.storage().bucket("gs://us-news-archive.appspot.com");
