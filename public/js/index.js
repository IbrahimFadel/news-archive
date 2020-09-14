const getHeadlines = async () => {
	// console.log(new Date());
	const res = await fetch(`/api/headlines/9-14-2020`);
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
