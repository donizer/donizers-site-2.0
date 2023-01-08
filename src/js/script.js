function burgerButton(e) {
	let nav = document.getElementById("nav");
	console.log(e.classList.length);
	nav.classList.toggle('active');
	e.classList.toggle('active');

}