const body = document.getElementsByTagName('body')[0];
const gBack = document.getElementById('gBack');
const gallery = document.getElementById('gallery');
const galleryItems = document.getElementsByClassName("gallery__item");
const baseApiURL = 'https://api.rule34.xxx/index.php?page=dapi&s=post&q=index&json=1'


let r34Api = `${baseApiURL}&tags=rating:safe`;

let r1 = 0.85;
let r2 = 1.5;

let counter = 1;


for (let i = 0; i < galleryItems.length; i++) {
	galleryItems[i].setAttribute('onclick', 'galleryPreview(this)')
}

function galleryPreview(e) {

	gBack.classList.toggle('active');
	body.classList.toggle('noscroll');

	if (counter%2 != 0) {
		let media = e.firstElementChild.firstElementChild;
		const 
		isMP4 = !!e.getElementsByClassName('type')[0].innerHTML,
		file_url = e.getElementsByClassName('url')[0].innerHTML,
		itemClass = e.classList.value.replace('gallery__item', '').trim();

		console.log(itemClass);

		if (isMP4 == false) {
			let node = document.createElement("img");
			node.setAttribute('src', file_url);
			node.classList.add(itemClass);
			gBack.appendChild(node);
		} else {
			let node = document.createElement("video");
			node.setAttribute('src', file_url);
			node.classList.add(itemClass);
			node.autoplay = true;
			// node.muted = true;
			node.loop = true;
			gBack.appendChild(node);
		}


	} else {
		gBack.innerHTML = '';
	}

	counter++;
}



async function getJSON(url) {
	const response = await fetch(url);
	return response.json();
}

function createGalleryItem(w, h, preview_url, sample_url, file_url, owner, isMP4) {
	const galleryItem = document.createElement('div');
		galleryItem.setAttribute('onclick', 'galleryPreview(this);');
		switch (true) {
			case (w/h > r2): galleryItem.classList.add('horizontal'); break;
			case (w/h > r1 && w/h <= r2 ): galleryItem.classList.add('square'); break;
			case (w/h < r1): galleryItem.classList.add('vertical'); break;
		}
		galleryItem.classList.add('gallery__item');
		gallery.appendChild(galleryItem)
		
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
		if (isMP4) {
			metaType.innerHTML = '1';
		} else {
			metaType.innerHTML = '';
		}

		galleryItemDesc.appendChild(metaType);

}

getJSON(r34Api).then(response => {

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
			
			if (isMP4) {
				file_url = `https://api-cdn.rule34.xxx/images/${dir}/${image}`;
			} else {
				file_url = response[i]['file_url'];
			}
			preview_url = response[i]['preview_url'];
			sample_url = response[i]['sample_url'];
		const
			w = response[i]['width'],
			h = response[i]['height'];
			
		createGalleryItem(w, h, preview_url, sample_url, file_url, owner, isMP4, anySample);		
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
