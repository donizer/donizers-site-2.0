const 
body = document.body,

nav = document.getElementById('nav'),
mBack = document.getElementById('mBack'),
burgerBtn = document.getElementById('burgerBtn'),

main = document.getElementsByTagName("main")[0],
aside = document.getElementsByClassName("aside")[0];

function burgerButton() {
	nav.classList.toggle('active');
	mBack.classList.toggle('active');
	burgerBtn.classList.toggle('active');
	body.classList.toggle('noscroll')
}


document.addEventListener('swiped-left', function(e) {
	aside.classList.remove('active');
	// body.classList.toggle('noscroll');
	// console.log(123)
	
});

document.addEventListener('swiped-right', function(e) {
	aside.classList.add('active');
	// body.classList.toggle('noscroll');
	// console.log(123)
	
});


