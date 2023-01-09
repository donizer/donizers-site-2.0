function burgerButton() {
	let nav = document.getElementById('nav');
	let mBack = document.getElementById('mBack');
	let burgerBtn = document.getElementById('burgerBtn');
	nav.classList.toggle('active');
	mBack.classList.toggle('active');
	burgerBtn.classList.toggle('active');
}