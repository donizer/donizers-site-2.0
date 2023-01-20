const gBack = document.getElementById('gBack');
const gallery = document.getElementById('gallery');
const galleryItems = document.getElementsByClassName("gallery__item");
const baseRule34ApiURL = 'https://api.rule34.xxx/index.php?page=dapi&s=post&q=index&json=1'
const baseRule34ApiTagsURL = 'https://api.rule34.xxx/index.php?page=dapi&s=tag&q=index';
const r34Filter = document.getElementById('r34Filter');
const r34Result = document.getElementById('r34Result');



// let rule34ApiURL = `${baseRule34ApiURL}&tags=+-futa+rating:safe+sort:score:desc+league_of_legends`;
let rule34ApiURL = createR34Link();

// TODO
let 
isSortable,
sortBy,
filterScore,
filterRating = false;


let isModuleActive = false;
let isSample = true;

for (let i = 0; i < galleryItems.length; i++) {
	galleryItems[i].setAttribute('onclick', 'galleryPreview(this)')
}

function createR34Link() {

	let gay = document.getElementById('gay').firstElementChild.id;
	let futa = document.getElementById('futanari').firstElementChild.id;
	let rating = document.getElementById('rating').firstElementChild.id;

	let sortBy = document.getElementById('sortBy').value;
	let sortType = document.getElementById('sortType').value;
	let sort = ` sort:${sortBy}:${sortType}`

	let searhTags = document.getElementById('r34search').value.split(' ');
	let tagsString = '';

	if (searhTags[0] == '') {
		tagsString = '';
	} else {

		for (let i = 0; i < searhTags.length; i++) {
			tagsString += ` ${searhTags[i]}`;
		}
	
	}

	let score = document.getElementById('score').value;
	if (!score) {
		score = ` score:>=0`;
	} else {
		score = ` score:>=${document.getElementById('score').value}`;
	}
	

	let link = 
	`${baseRule34ApiURL}&tags=${tagsString}${gay}${futa}${rating}${sort}${score}`

	localStorage.setItem("linkR34", link);
	
	return link;
}

function selfRemove(e) {
	e.parentNode.removeChild(e);
}

let counter = document.getElementById('preTags').children;
counter = new Array(counter.length);
for(let i = 0; i < counter.length; i++) {
	counter[i]=0;
}

function triChecker(e) {
	let tag = e.id;
	let colors = e.firstElementChild;
	let state = colors.classList[0];

	console.log(colors.classList[0])



	if (state === 'off') {
		colors.removeAttribute('class');
		colors.classList.toggle('on');
		if (tag == 'rating') {
			colors.id = ' rating:safe'
		} else {
			colors.id = ` ${tag}`;
		}

	} else if (state === 'on') {
		colors.removeAttribute('class');
		colors.classList.toggle('mid');
		if (tag == 'rating') {
			colors.id = ' (rating:safe ~ rating:questionable)'
		} else {
			colors.id = ``;
		}
	} else if (state === 'mid') {
		colors.removeAttribute('class');
		colors.classList.toggle('off');
		if (tag == 'rating') {
			colors.id = ''
		} else {
			colors.id = ` -${tag}`;
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
	var
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
	console.log(createR34Link()) 
	await getJSON(createR34Link()).then(response => {

		console.log(123)

		r34Result.innerHTML = `Found ${response.length} items`
		console.log(); // fetched movies
		for(let i = 0; i < response.length; i++) {
			createGalleryItem(response[i]);		
		}


	})

	if (gallery.innerHTML == '') {
		
		gallery.innerHTML = 'No results found'
	}
}

if (localStorage.getItem("linkR34") != "") {
	getJSON(localStorage.getItem("linkR34")).then(response => {
		
		r34Result.innerHTML = `Found ${response.length} items`
		for(let i = 0; i < response.length; i++) {
			createGalleryItem(response[i]);		
		}
			
	});
} else {
	searchR34()
}

document.querySelectorAll('.triCheck').forEach(function(e){
	e.addEventListener('click', (e) =>{
		searchR34()
	});
});


r34Filter.addEventListener('change', function() {
    getJSON(createR34Link()).then(response => {
		searchR34()	
	})
});



// async function getXML(url) {
// 	const response = await fetch(url);
// 	return response;
// }

// getXML(baseRule34ApiTagsURL).then(response => {

// 	console.log(response)

// });

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
