import '../styles/style.scss'
import * as d3 from 'd3';

// Dark Mode
const darkBtn = document.querySelector("header button");
const body = document.querySelector("body");

// Manipuleren
const profilePic = document.querySelector("header img")
const bandName = document.querySelector("h1");
const followers = document.querySelector("header p:first-of-type a");
const listeners = document.querySelector("header p:last-of-type a");

// Album cards
const card = document.querySelector("article");

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

		//changeData(response)
	})

// Overview
fetch('./data/bts-overview.json')
    .then((response) => response.json())
    .then(response => {
		changeData(response)
		//console.log(response.data.artist.visuals.gallery.items[0].sources[0].url);
	})


const urls = ['./data/bts-albums.json', './data/bts-overview.json'];

// Robbert
Promise.all(urls.map(u => {
	fetch(u)
})).then(responses =>{
    return Promise.all(responses.map(res => res.json()))
}).then(data => {
	console.log(data);
});

/*
// Stackoverflow
Promise.all(urls.map(u=>fetch(u))).then(responses =>
    Promise.all(responses.map(res => res.text()))
).then(texts => {
	console.log(data);
})
*/


function changeData(response) {
	bandName.textContent = response.data.artist.profile.name;
	followers.textContent = response.data.artist.stats.followers;
	listeners.textContent = response.data.artist.stats.monthlyListeners;
	profilePic.src = response.data.artist.visuals.gallery.items[0].sources[0].url;
} 

