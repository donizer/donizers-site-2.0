const gBack = document.getElementById('gBack');
const gallery = document.getElementById('gallery');
const galleryItems = document.getElementsByClassName("gallery__item");
const baseRule34ApiURL = 'https://api.rule34.xxx/index.php?page=dapi&s=post&q=index&json=1'
const baseRule34ApiTagsURL = 'https://api.rule34.xxx/index.php?page=dapi&s=tag&q=index';
const r34Filter = document.getElementById('r34Filter');
const r34Result = document.getElementById('r34Result');

let searchTags = document.getElementById('r34search').value;
let score = document.getElementById('score').value;

let sortBy = document.getElementById('sortBy').value;
let sortType = document.getElementById('sortType').value;

let gay = document.getElementById('gay').firstElementChild.id;
let futa = document.getElementById('futanari').firstElementChild.id;
let rating = document.getElementById('rating').firstElementChild.id;


let isModuleActive = false;
let isSample = true;

for (let i = 0; i < galleryItems.length; i++) {
	galleryItems[i].setAttribute('onclick', 'galleryPreview(this)')
}

function createR34Link() {

	searchTags = document.getElementById('r34search').value;
	score = document.getElementById('score').value;

	if (score <=0) {
		score = ''
	} else {
		score = ` score:>=${score}`
	}
	console.log(score)

	sortBy = document.getElementById('sortBy').value;
	sortType = document.getElementById('sortType').value;
	sort = ` sort:${sortBy}:${sortType}`
	
	gay = document.getElementById('gay').firstElementChild.id;
	futa = document.getElementById('futanari').firstElementChild.id;
	rating = document.getElementById('rating').firstElementChild.id;

	let link = 
	`${baseRule34ApiURL}&tags=${searchTags}${gay}${futa}${rating}${sort}${score}`

	localStorage.setItem("linkR34", link);
	localStorage.setItem("r34search", searchTags);
	localStorage.setItem("score", score);
	localStorage.setItem("sortBy", sortBy);
	localStorage.setItem("sortType", sortType);
	localStorage.setItem("gay", gay);
	localStorage.setItem("futanari", futa);
	localStorage.setItem("rating", rating);
	
	return link;
}

function selfRemove(e) {
	e.parentNode.removeChild(e);
}

function triChecker(e) {
	let tag = e.id;
	let triCheckInner = e.firstElementChild;
	let state = triCheckInner.classList[0];

	if (state === 'off') {
		triCheckInner.removeAttribute('class');
		triCheckInner.classList.toggle('on');
		if (tag == 'rating') {
			triCheckInner.id = ' rating:safe'
		} else {
			triCheckInner.id = ` ${tag}`;
		}

	} else if (state === 'on') {
		triCheckInner.removeAttribute('class');
		triCheckInner.classList.toggle('mid');
		if (tag == 'rating') {
			triCheckInner.id = ' ( rating:safe ~ rating:questionable )'
		} else {
			triCheckInner.id = ``;
		}
	} else if (state === 'mid') {
		triCheckInner.removeAttribute('class');
		triCheckInner.classList.toggle('off');
		if (tag == 'rating') {
			triCheckInner.id = ''
		} else {
			triCheckInner.id = ` -${tag}`;
		}
	} 
}

async function getJSON(url) {
	const response = await fetch(url);
	return response.json();
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


function createGalleryItem(response) {
	let
	width = response['width'],
	height = response['height'],
	dir = response['directory'],
	image = response['image'],
	preview_url = response['preview_url'],
	sample_url = response['sample_url'],
	file_url = response['file_url'],
	isMP4 = response['file_url']
		.split('.')[response['file_url']
		.split('.').length-1] === 'mp4',
	owner = response['owner'],
	id = response['id'],
	score = response['score'];

	if (isMP4) {
		file_url = `https://api-cdn.rule34.xxx/images/${dir}/${image}`;
	} else {
		file_url = response['file_url'];
	}

	let r0 = 0.333;
	let r1 = 0.85;
	let r2 = 1.5;
	let r3 = 2.5;
	let ratio = width/height;

	const galleryItem = document.createElement('div');
	galleryItem.setAttribute('onclick', 'galleryPreview(this);');

	if (ratio > r3) {
		galleryItem.classList.add('horizontal-ultra');
	} else if (ratio > r2) {
		galleryItem.classList.add('horizontal');
	} else if (ratio > r1) {
		galleryItem.classList.add('square');
	} else if (ratio < r1 && width/height >= r0) {
		galleryItem.classList.add('vertical');
	} else if (ratio < r0) {
		galleryItem.classList.add('vertical-ultra');
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

async function searchR34() {

	gallery.innerHTML = '';
	r34Result.innerHTML = `Found 0 items`

	await getJSON(createR34Link()).then(response => {

		r34Result.innerHTML = `Found ${response.length} items`;

		for(let i = 0; i < response.length; i++) {

			if (response[i].id === 0) {
				continue;
			}
			createGalleryItem(response[i]);		
		}
	})
}

if (localStorage.getItem("linkR34") != "") {

	localStorage.getItem("linkR34");
	searchTags = localStorage.getItem("r34search");
	score = localStorage.getItem("score");
	sortBy = localStorage.getItem("sortBy");
	sortType = localStorage.getItem("sortType");
	gay = localStorage.getItem("gay");
	fute = localStorage.getItem("futanari");
	rating = localStorage.getItem("rating");

	getJSON(localStorage.getItem("linkR34")).then(response => {
		r34Result.innerHTML = `Found ${response.length} items`;

		for(let i = 0; i < response.length; i++) {

			if (response[i].id === 0) {
				continue;
			}
			createGalleryItem(response[i]);		
		}
	});
} else {
	searchR34()
}

document.querySelectorAll('.triCheck').forEach(function(e){
	e.addEventListener('click', () =>{
		searchR34()
	});
});

r34Filter.addEventListener('change', function() {
    getJSON(createR34Link()).then(response => {
		searchR34()	
	})
});
