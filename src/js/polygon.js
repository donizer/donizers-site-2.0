let video = document.getElementById("video");
let btn = document.getElementById("dtn");

function play() {
	let link2 = 'https://api-cdn.rule34.xxx/images/3368/666ad8695ca216f5a4b4dee3fb2ed269.mp4'
	//           https://ws-cdn-video.rule34.xxx//images/1102/87789cdf2d9b094045ea639404751154.mp4?7278995
	//           https://api-cdn.rule34.xxx/images/4919/944caa8eb683d9ab072b65ec70b08f97.mp4
	//			 https://api-cdn.rule34.xxx/images/1014/49e8300847105d660c83708e36cacbda.mp4
	// 			 https://api-cdn.rule34.xxx/images/1014/49e8300847105d660c83708e36cacbda.mp4
	//			 https://api-cdn.rule34.xxx/images/3368/666ad8695ca216f5a4b4dee3fb2ed269.mp4

	video.setAttribute('src', link2);
	// video.setAttribute('crossorigin', 'anonymous');
}
let link = 'https://cdn.discordapp.com/attachments/497404476907454466/1063156577198153779/c6529ff95ed6fbe970b66c535241329e.mp4';
// let link2 = 'https://api-cdn-mp4.rule34.xxx/images/5725/641ae0c272fbfa2e28de0b3e9d58c60f.mp4'

// video.setAttribute('src', link2);
// video.setAttribute('crossorigin', 'anonymous');

let r34Api = "https://api.rule34.xxx/index.php?page=dapi&s=post&q=index&json=1&tags=mp4";

async function getJSON() {
	const response = await fetch(r34Api);
	return response.json();
} 

getJSON().then(response => {
	console.log(response); // fetched movies
  });


