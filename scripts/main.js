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

const yearEl = document.querySelector("article h2");
const titleEl = document.querySelector("article h3");
const albumImg = document.querySelector("article img");

const card = document.querySelector("article");

// Dark Mode
function darkMode() {
	body.classList.toggle("dark-mode");
}
darkBtn.addEventListener("click", darkMode);

// Fetch data Stackoverflow https://stackoverflow.com/questions/31710768/how-can-i-fetch-an-array-of-urls-with-promise-all
Promise.all(urls.map(u=>fetch(u))).then(responses =>
    Promise.all(responses.map(res => res.json()))
).then(data => {
	const albums = [];
	data[0].data.artist.discography.albums.items.forEach(item => {
		albums.push(item.releases.items[0]);
	});
	console.log(albums);

	console.log(data);
	changeData(data, albums);
})

function changeData(data, albums) {
	bandName.textContent = data[1].data.artist.profile.name;
	followers.textContent = data[1].data.artist.stats.followers;
	listeners.textContent = data[1].data.artist.stats.monthlyListeners;
	profilePic.src = data[1].data.artist.visuals.gallery.items[0].sources[0].url;

	// Show 1 album
	yearEl.textContent = albums[0].date.year;
	titleEl.textContent = albums[0].name;
	albumImg.src = albums[0].coverArt.sources[2].url;

	/* Poging 1
	Object.keys(albums[0].date.year).forEach(key => {
		let article = document.createElement("article");
		yearEl.textContent = key;
		card.appendChild(article);
	});

	albums.forEach(obj => {
		for (const [key, value] of Object.entries(obj)) {
			
		}
	})
	*/

	/* Poging 2
	albums.forEach(function(val) {
		html += "<article>";
		html += "<h2>";
		html += "<h3>";
		html += "<img src=''"
		html += "</article>"
	})
	*/

} 

// TODO: Sorteren andersom en foreach maken