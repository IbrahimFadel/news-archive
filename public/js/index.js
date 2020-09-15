const getHeadlines = async date => {
	// const d = new Date();
	// const date = `${d.getMonth() + 1}-${d.getDate()}-${d.getUTCFullYear()}`;
	// const res = await fetch(`/api/headlines/${date}`);
	const res = await fetch(`/api/headlines/${date}`);
	const data = await res.json();
	return data;
};

const main = async date => {
	console.log(date);
	const headlines = await getHeadlines(date);

	document.getElementById(
		'cnn-img',
	).src = `data:image/png;base64,${headlines.cnnImg}`;

	document.getElementById(
		'fox-img',
	).src = `data:image/png;base64,${headlines.foxImg}`;

	console.log(headlines);
	headlines.cnnHeadlines.forEach(headline => {
		const pTag = document.createElement('p');
		pTag.innerHTML = headline;
		document.getElementById('cnn-headlines').appendChild(pTag);
	});

	headlines.foxHeadlines.forEach(headline => {
		const pTag = document.createElement('p');
		pTag.innerHTML = headline;
		document.getElementById('fox-headlines').appendChild(pTag);
	});
};
