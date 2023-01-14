const pGallery = document.getElementById("gallery");
let r34Api = "https://api.rule34.xxx/index.php?page=dapi&s=post&q=index&json=1&tags=mp4";

let r1 = 0.6;
let r2 = 1.6;


async function getJSON() {
	const response = await fetch(r34Api);
	return response.json();
}

function createGalleryItem(w, h, sample_url, file_url, owner, isMP4) {
	const galleryItem = document.createElement('div');
		galleryItem.setAttribute('onclick', 'galleryPreview(this);');
		switch (true) {
			case (w/h > r2): galleryItem.classList.add('horizontal'); break;
			case (w/h > r1 && w/h <= r2 ): galleryItem.classList.add('big'); break;
			case (w/h < r1): galleryItem.classList.add('vertical'); break;
		}
		galleryItem.classList.add('gallery__item');
		pGallery.appendChild(galleryItem)
		
		const mediaContainer = document.createElement('div');
		mediaContainer.classList.add('media__container');
		galleryItem.appendChild(mediaContainer)
		
		const img = document.createElement('img');
		img.setAttribute('src', sample_url)
		mediaContainer.appendChild(img)
		
		const galleryItemDesc = document.createElement('div');
		galleryItemDesc.classList.add('gallery__item-desc');
		mediaContainer.appendChild(galleryItemDesc)
		
		const p = document.createElement('p');
		p.innerHTML = `owner: ${owner}`;
		galleryItemDesc.appendChild(p);

		const metaURL = document.createElement('p');
		metaURL.classList.add('url');
		metaURL.innerHTML = file_url;
		galleryItemDesc.appendChild(metaURL);

		const metaType = document.createElement('p');
		metaType.classList.add('type');
		metaType.innerHTML = isMP4;
		galleryItemDesc.appendChild(metaType);

}

getJSON().then(response => {

	console.log(response); // fetched movies
	for(let i = 0; i < 100; i++) {
		const dir = response[i]['directory'],
			image = response[i]['image'],
			hash = response[i]['hash'],
			score = response[i]['score'],
			format = response[i]['image'].split('.')[response[0]['image'].split('.').length-1],
			fileName = response[i]['image'].split('.')[0],
			isMP4 = format === 'mp4',
			owner = response[i]['owner'],
			anySample = !!response[i]['sample'];
			
			file_url = `https://api-cdn.rule34.xxx/images/${dir}/${image}`;
			preview_url = `https://api-cdn.rule34.xxx/images/${dir}/thumbnail_${hash}.jpg`;
			sample_url = response[i]['sample_url']
			
		// if (anySample) {
		// 	sample_url = `https://api-cdn.rule34.xxx/samples/${dir}/sample_${hash}.jpg`;
		// } else {
		// 	sample_url = `https://api-cdn.rule34.xxx/images/${dir}/${hash}.${format}`;
		// }
		//https://api-cdn.rule34.xxx/samples/6388/sample_679389185863f840d751f12664c9ce64.jpg
		const
			w = response[i]['width'],
			h = response[i]['height'];
			
		createGalleryItem(w, h, sample_url, file_url, owner, isMP4, anySample);		
	}
		
});





// 0.7
// 0.84
// 1.07
// 1.43



// let r1 = 0.7;
// let r2 = 0.84;
// let r3 = 1.07;
// let r4 = 1.43;



// a = 480;
// b = 650;
// // 0.7
// console.log(`${a}/${b} = ${a/b} > ${r1} : ${a/b > r1}`)
// console.log(`${a}/${b} = ${a/b} > ${r2} : ${a/b > r2}`)
// console.log(`${a}/${b} = ${a/b} > ${r3} : ${a/b > r3}`)
// console.log(`${a}/${b} = ${a/b} > ${r4} : ${a/b > r4}`)

// console.log('#####################')

// a = 550;
// b = 650;
// // 0.84
// console.log(`${a}/${b} = ${a/b} > ${r1} : ${a/b > r1}`)
// console.log(`${a}/${b} = ${a/b} > ${r2} : ${a/b > r2}`)
// console.log(`${a}/${b} = ${a/b} > ${r3} : ${a/b > r3}`)
// console.log(`${a}/${b} = ${a/b} > ${r4} : ${a/b > r4}`)

// console.log('#####################')


// a = 700;
// b = 650;
// // 1.07
// console.log(`${a}/${b} = ${a/b} > ${r1} : ${a/b > r1}`)
// console.log(`${a}/${b} = ${a/b} > ${r2} : ${a/b > r2}`)
// console.log(`${a}/${b} = ${a/b} > ${r3} : ${a/b > r3}`)
// console.log(`${a}/${b} = ${a/b} > ${r4} : ${a/b > r4}`)

// console.log('#####################')

// a = 935;
// b = 650;
// // 1.43
// console.log(`${a}/${b} = ${a/b} > ${r1} : ${a/b > r1}`)
// console.log(`${a}/${b} = ${a/b} > ${r2} : ${a/b > r2}`)
// console.log(`${a}/${b} = ${a/b} > ${r3} : ${a/b > r3}`)
// console.log(`${a}/${b} = ${a/b} > ${r4} : ${a/b > r4}`)
