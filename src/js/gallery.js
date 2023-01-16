const body = document.getElementsByTagName('body')[0];
const gBack = document.getElementById('gBack');
const gallery = document.getElementById('gallery');
const galleryItems = document.getElementsByClassName("gallery__item");
const baseRule34ApiURL = 'https://api.rule34.xxx/index.php?page=dapi&s=post&q=index&json=1'


let rule34ApiURL = `${baseRule34ApiURL}&tags=+-futa+rating:safe+sort:score:desc+league_of_legends`;


// TODO
let 
isSortable,
sortBy,
filterScore,
filterRating = false;

 

let checkbox = document.getElementById('test');

checkbox.indeterminate = true;
console.log(checkbox)

let isModuleActive = false;
let isSample = true;

for (let i = 0; i < galleryItems.length; i++) {
	galleryItems[i].setAttribute('onclick', 'galleryPreview(this)')
}

function galleryPreview(e) {

	gBack.classList.toggle('active');
	body.classList.toggle('noscroll');

	if (isModuleActive == false) {
		const 
		file_url = e.getElementsByClassName('file_url')[0].innerHTML,
		sample_url = e.getElementsByClassName('sample_url')[0].innerHTML,
		isMP4 = file_url.split('.')[file_url.split('.').length-1] === 'mp4',
		itemClass = e.classList.value.replace('gallery__item', '').trim();

		if (isMP4 == false) {
			let node = document.createElement("img");
			if (isSample) {
				node.setAttribute('src', sample_url);
			} else {
				node.setAttribute('src', file_url);
			}
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

	isModuleActive = !isModuleActive;
}

async function getJSON(url) {
	const response = await fetch(url);
	return response.json();
}

function createGalleryItem(response) {
	var
	width = response['width'],
	height = response['height'],
	dir = response['directory'],
	image = response['image'],
	preview_url = response['preview_url'],
	sample_url = response['sample_url'],
	file_url = response['file_url'],
	isMP4 = response['file_url'].split('.')[response['file_url'].split('.').length-1] === 'mp4',
	owner = response['owner'];

	// console.log(isMP4)

	if (isMP4) {
		file_url = `https://api-cdn.rule34.xxx/images/${dir}/${image}`;
	} else {
		file_url = response['file_url'];
	}

	let r0 = 0.333;
	let r1 = 0.85;
	let r2 = 1.5;
	let r3 = 2.5;

	const galleryItem = document.createElement('div');
	galleryItem.setAttribute('onclick', 'galleryPreview(this);');
	switch (true) {
		case (width/height > r3): galleryItem.classList.add('horizontal-ultra'); break;
		case (width/height > r2): galleryItem.classList.add('horizontal'); break;
		case (width/height > r1 && width/height <= r2 ): galleryItem.classList.add('square'); break;
		case (width/height < r1 && width/height >= r0): galleryItem.classList.add('vertical'); break;
		case (width/height < r0): galleryItem.classList.add('vertical-ultra'); break;
	}
	galleryItem.classList.add('gallery__item');

	// console.log(galleryItem.classList[0])
	const mediaContainer = document.createElement('div');
	mediaContainer.classList.add('media__container');

	var deviceWidth = (window.innerWidth > 0) ? window.innerWidth : screen.width;
	const img = document.createElement('img');
	if (deviceWidth < 426) {
		img.setAttribute('src', sample_url)
	} else {
		img.setAttribute('src', preview_url)
	}
	

	const galleryItemDesc = document.createElement('div');
	galleryItemDesc.classList.add('gallery__item-desc');

	const p = document.createElement('p');
	p.innerHTML = `owner: ${owner}`;

	const fileURLe = document.createElement('p');
	fileURLe.classList.add('file_url');
	fileURLe.innerHTML = file_url;
	
	const sampleURLe = document.createElement('p');
	sampleURLe.classList.add('sample_url');
	sampleURLe.innerHTML = sample_url;

	gallery.appendChild(galleryItem);
	galleryItem.appendChild(mediaContainer);
	mediaContainer.appendChild(img);
	mediaContainer.appendChild(galleryItemDesc);
	galleryItemDesc.appendChild(p);
	galleryItemDesc.appendChild(fileURLe);
	galleryItemDesc.appendChild(sampleURLe);

}

getJSON(rule34ApiURL).then(response => {

	console.log(response); // fetched movies
	for(let i = 0; i < response.length; i++) {
		createGalleryItem(response[i]);		
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
