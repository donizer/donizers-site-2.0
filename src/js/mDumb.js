export function createGalleryItem(w, h, preview_url, sample_url, file_url, owner, isMP4) {
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