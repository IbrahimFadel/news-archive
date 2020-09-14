const admin = require('firebase-admin');
const serviceAccount = require('./serviceAcountKey.json');

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	databaseURL: 'https://news-archive-81af9.firebaseio.com',
});

const db = admin.database();

module.exports = {
	db,
};
