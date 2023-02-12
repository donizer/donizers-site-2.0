let background;
let bgctest = "green url('img_tree.png') no-repeat right top";

// console.log(bgcPos)

body.addEventListener('mousemove', (event) => {

});

var width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
var height = (window.innerHeight > 0) ? window.innerHeight : screen.height;

const box = document.querySelector('body');
const x = document.querySelector('.x');
const y = document.querySelector('.y');

function updateDisplay(event) {
	let mouseX = Math.round((event.pageX / width)*100);
	let mouseY = Math.round((event.pageY / height)*100);
	
	// test = 'red'
	
	let prik =
	`-moz-linear-gradient(${((mouseY+mouseX)/4)+25}deg, #4158D0 -12.72%, #C850C0 24.78%, #FFCC70 125.46%)`;

	box.style.backgroundImage = prik;

  x.innerHTML = `X is: ${mouseX}`
  y.innerHTML = `Y is: ${mouseY}`

//   console.log(box.style.backgroundPosition = `${mouseX}% ${mouseY}%`)
}

box.addEventListener("mousemove", updateDisplay, false);
box.addEventListener("mouseenter", updateDisplay, false);
box.addEventListener("mouseleave", updateDisplay, false);
