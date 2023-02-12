link = 'https://api.waifu.pics/sfw/neko';
id = document.getElementById('img')

async function getJSON(url) {
	const response = await fetch(url);
	return response.json();
}


async function findWaifu(e) {
	await getJSON(link).then(response => {
		e.src = response['url']
	})
}

findWaifu(id);


