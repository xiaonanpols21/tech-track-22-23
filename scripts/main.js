import '../styles/style.scss'
import * as d3 from 'd3';
import { html } from 'd3';

// Data
const urls = ['./data/bts-albums.json', './data/bts-overview.json'];

// Dark Mode
const darkBtn = document.querySelector("header button");
const body = document.querySelector("body");

// Change to data
const profilePic = document.querySelector("header img")
const bandName = document.querySelector("h1");
const followers = document.querySelector("header p:first-of-type a");
const listeners = document.querySelector("header p:last-of-type a");

/*
const yearEl = document.querySelector("article h2");
const titleEl = document.querySelector("article h3");
const albumImg = document.querySelector("article img");
const play = document.querySelector("article a")
const card = document.querySelector("article");
*/

const main = document.querySelector("main");

// Dark Mode
function darkMode() {
	body.classList.toggle("dark-mode");
}
darkBtn.addEventListener("click", darkMode);

// Fetch data, Stackoverflow https://stackoverflow.com/questions/31710768/how-can-i-fetch-an-array-of-urls-with-promise-all
Promise.all(urls.map(u=>fetch(u))).then(responses =>
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

	console.log(data);
	changeData(data, albums);
})

// Show to the HTML
function changeData(data, albums) {
	bandName.textContent = data[1].data.artist.profile.name;
	followers.textContent = data[1].data.artist.stats.followers;
	listeners.textContent = data[1].data.artist.stats.monthlyListeners;
	profilePic.src = data[1].data.artist.visuals.gallery.items[0].sources[0].url;

	// Show 1 album
	/*
	yearEl.textContent = albums[0].date.year;
	titleEl.textContent = albums[0].name;
	//albumImg.src = albums[0].coverArt.sources[2].url;

	play.href = albums[0].sharingInfo.shareUrl;
	console.log(albums[0].sharingInfo.shareUrl);
	*/

	// Poging 3
	albums.forEach((element) => {
		const albumImg = element.coverArt.sources[2].url;
		const year = element.date.year;
		const name = element.name;
		// TODO: Play doet nog nii
		const play = element.sharingInfo.shareUrl;
		console.log(play);

		const html = `
		<article>
			<h2>${year}</h2>
			<h3>${name}</h3>
			<img src="${albumImg}" alt="BTS Album">
			<a class="play" href="${play}"><i class="fa-solid fa-play"></i></a>
		</article>
		`
		main.insertAdjacentHTML("beforeend", html );
	});

} 

// TODO: foreach maken, play btn, filter year slider