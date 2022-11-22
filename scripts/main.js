import "../styles/style.scss"; 

// Import JS files
import * as v from "./variables.js"; 
import * as d from "./d3-main.js"; 
import * as func from "./functions.js"; 
import * as gsap from "./gsap.js"; 
import * as zero from "./zeroGone.js"; 

import * as d3 from 'd3';
import { cross, html, thresholdScott } from 'd3';

// Fetch data, Stackoverflow https://stackoverflow.com/questions/31710768/how-can-i-fetch-an-array-of-urls-with-promise-all
Promise.all(v.urls.map(u=>fetch(u))).then(responses =>
    Promise.all(responses.map(res => res.json()))
).then(data => {

	// Make new array from only the Albums
	const albums = [];
	data[0].data.artist.discography.albums.items.forEach(item => {
		albums.push(item.releases.items[0]);
	});

	// Sort from debut to present, Freecodecamp
	function order(albums) {
		return albums.sort(function(a, b) {
			return a === b ? 0 : a < b ? 1 : -1;
		})
	}
	console.log(order(albums));

	// Tel hoeveel albums er zijn van welk jaar
	// Bron: https://stackoverflow.com/questions/51067921/javascript-count-key-value-pairs
	const countMap = {}
	for(const album of albums) {
		if(album.date.year in countMap) {
			countMap[album.date.year] = countMap[album.date.year] + 1;
		} else {
			countMap[album.date.year] = 1;
		}
	};

	const countAlbum = []
	Object.keys(countMap).forEach(year => {
		countAlbum.push({
			year,
			count: countMap[year]
		})
	});
	console.log(countAlbum)

	changeData(data, albums);
	d.countData(countAlbum);
});

// Show to the HTML
function changeData(data, albums) {
	// Header
	v.bandName.textContent = data[1].data.artist.profile.name;
	v.followers.textContent = data[1].data.artist.stats.followers;
	v.listeners.textContent = data[1].data.artist.stats.monthlyListeners;
	v.profilePic.src = data[1].data.artist.visuals.gallery.items[0].sources[0].url;

	// Zero state
	v.zeroImg.src =  data[1].data.artist.visuals.gallery.items[1].sources[0].url;

	// ForEach Albums
	albums.forEach((item) => {
		const albumImg = item.coverArt.sources[2].url;
		const year = item.date.year;
		const name = item.name;
		const play = item.sharingInfo.shareUrl;

		const html = 
		`<article class="card" data-name="${year}">
			<h2>${year}</h2>
			<h3>${name}</h3>
			<img src="${albumImg}" alt="${name}">
			<a class="play" href="${play}" target="_blank"><i class="fa-solid fa-play"></i></a>
		</article>`
		v.main.insertAdjacentHTML("beforeend", html );
		// Web API, insertAdjacentHTML is om het te tonen in de main. Beforeend betekend: Before the end of the element (last child), W3Schools https://www.w3schools.com/jsref/met_node_insertadjacenthtml.asp
		
		func.addEvents(html);
	});
};
