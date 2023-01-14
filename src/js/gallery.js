let gBack = document.getElementById('gBack');
let counter = 1;

let gallery = document.getElementsByClassName("gallery");
let galleryItems = document.getElementsByClassName("gallery__item");

// let link = galleryItems[0].children[0].attributes[0].value;
for (let i = 0; i < galleryItems.length; i++) {
	galleryItems[i].setAttribute('onclick', 'galleryPreview(this)')
}

function galleryPreview(e) {

	gBack.classList.toggle('active');

	if (counter%2 != 0) {
		let media = e.firstElementChild.firstElementChild;
		const isMP4 = !!e.getElementsByClassName('type')[0].innerHTML;
		const file_url = e.getElementsByClassName('url')[0].innerHTML;
		console.log(isMP4, file_url);

		if (isMP4 == false) {
			let node = document.createElement("img");
			node.setAttribute('src', file_url);
			gBack.appendChild(node);
		} else {
			let node = document.createElement("video");
			node.setAttribute('src', file_url);
			node.autoplay = true;
			// node.muted = true;
			node.loop = true;
			node.preload = 'metadata'
			gBack.appendChild(node);
		}


	} else {
		gBack.innerHTML = '';
	}

	counter++;
}