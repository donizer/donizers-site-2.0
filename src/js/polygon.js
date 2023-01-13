let video = document.getElementById("video");
let btn = document.getElementById("dtn");

function play() {
	let link2 = 'https://api-cdn-mp4.rule34.xxx/images/5725/641ae0c272fbfa2e28de0b3e9d58c60f.mp4'

	video.setAttribute('src', link2);
	// video.setAttribute('crossorigin', 'anonymous');
}
let link = 'https://cdn.discordapp.com/attachments/497404476907454466/1063156577198153779/c6529ff95ed6fbe970b66c535241329e.mp4';
// let link2 = 'https://api-cdn-mp4.rule34.xxx/images/5725/641ae0c272fbfa2e28de0b3e9d58c60f.mp4'

// video.setAttribute('src', link2);
// video.setAttribute('crossorigin', 'anonymous');

async function foo() {
	
	response = await fetch(link, { mode: 'no-cors' })

	return response;
} 

console.log(foo());