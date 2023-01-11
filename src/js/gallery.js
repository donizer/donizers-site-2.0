let gBack = document.getElementById('gBack');


let counter = 1;
function galleryPreview(e) {

	gBack.classList.toggle('active');

	if (counter%2 != 0) {
		let link = e.firstElementChild.attributes[0].value;
		let node = document.createElement("img");
		node.setAttribute('src', link);
		gBack.appendChild(node);
	} else {
		gBack.innerHTML = '';
	}

	counter++;
}


let gallery = document.getElementsByClassName("gallery");
let galleryItems = document.getElementsByClassName("gallery__item");

console.log(galleryItems[0].attributes[1].value);

let link = galleryItems[0].children[0].attributes[0].value;
for (let i = 0; i < galleryItems.length; i++) {
	galleryItems[i].setAttribute('onclick', 'galleryPreview(this)')
}