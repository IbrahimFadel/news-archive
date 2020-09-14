const getHeadlines = async () => {
	const res = await fetch(`/api/headlines/${JSON.stringify(new Date())}`);
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
})();

// const data = fetch(`/api/headlines/${JSON.stringify(new Date())}`)
// 	.then(response => response.json())
// 	.then(data => data);

// document.getElementById("cnn-img").src = data.
