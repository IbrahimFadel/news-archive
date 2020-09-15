const getHeadlines = async () => {
	const d = new Date();
	const date = `${d.getMonth() + 1}-${d.getDate()}-${d.getUTCFullYear()}`;
	const res = await fetch(`/api/headlines/${date}`);
	const data = await res.json();
	return data;
};

(async () => {
	const headlines = await getHeadlines();

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
})();
