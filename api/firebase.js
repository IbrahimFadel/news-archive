const firebase = require('firebase');

firebase.initializeApp({
	apiKey: 'AIzaSyAxC4g7VqDf9IpM96v0eu7IeUfCAXKJubE',
	authDomain: 'news-archive-81af9.firebaseapp.com',
	databaseURL: 'https://news-archive-81af9.firebaseio.com',
	projectId: 'news-archive-81af9',
	storageBucket: 'news-archive-81af9.appspot.com',
	messagingSenderId: '309519019266',
	appId: '1:309519019266:web:1ebeb4442eef374aca261b',
	measurementId: 'G-SN9BMLXX0G',
});

// firebase.analytics();

module.exports = {
	db: firebase.database(),
};
