let nav = document.getElementById('nav');
let mBack = document.getElementById('mBack');


let burgerBtn = document.getElementById('burgerBtn');
let main = document.getElementsByTagName("main")[0];

function burgerButton() {
	nav.classList.toggle('active');
	mBack.classList.toggle('active');
	burgerBtn.classList.toggle('active');
}


document.addEventListener('swiped-left', function(e) {
	main.classList.remove('active');
	console.log(123)
	
});

document.addEventListener('swiped-right', function(e) {
	main.classList.add('active');
	console.log(123)
	
});


