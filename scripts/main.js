import '../styles/style.scss'
import * as d3 from 'd3';

const darkBtn = document.querySelector("header button");
const body = document.querySelector("body");

const bandName = document.querySelector("h1");
const followers = document.querySelector("header p:first-of-type a");
const listeners = document.querySelector("header p:last-of-type a");

// Dark Mode
function darkMode() {
	body.classList.toggle("dark-mode");
}
darkBtn.addEventListener("click", darkMode);

// Albums
fetch('./data/bts-albums.json')
    .then((response) => response.json())
    .then(response => {
		console.log(response);

		// Albums
		const albums = [];
		response.data.artist.discography.albums.items.forEach(item => {
			albums.push(item.releases.items[0]);
		});
		console.log(albums);
	})

// Overview
fetch('./data/bts-overview.json')
    .then((response) => response.json())
    .then(response => {
		txtContent(response)
	})
	
function txtContent(response) {
	bandName.textContent = response.data.artist.profile.name;
	followers.textContent = response.data.artist.stats.followers;
	listeners.textContent = response.data.artist.stats.monthlyListeners;
}