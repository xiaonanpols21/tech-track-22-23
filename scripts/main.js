import '../styles/style.scss'
import * as d3 from 'd3';
import { html, thresholdScott } from 'd3';

// Data
const urls = ['./data/bts-albums.json', './data/bts-overview.json'];

// Dark Mode
const darkBtn = document.querySelector("header button:last-of-type");
const body = document.querySelector("body");

// Change to data
const profilePic = document.querySelector("header img")
const bandName = document.querySelector("h1");
const followers = document.querySelector("header p:first-of-type a");
const listeners = document.querySelector("header p:last-of-type a");

const main = document.querySelector("main");
const buttons = document.querySelectorAll("nav button");
const firstBtn = document.querySelector("nav button:first-of-type");

// Dark Mode
function darkMode() {
	body.classList.toggle("dark-mode");
};
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
});

// Show to the HTML

function changeData(data, albums) {
	// Header
	bandName.textContent = data[1].data.artist.profile.name;
	followers.textContent = data[1].data.artist.stats.followers;
	listeners.textContent = data[1].data.artist.stats.monthlyListeners;
	profilePic.src = data[1].data.artist.visuals.gallery.items[0].sources[0].url;

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
		main.insertAdjacentHTML("beforeend", html );
		// Web API, insertAdjacentHTML is om het te tonen in de main. Beforeend betekend: Before the end of the element (last child), W3Schools https://www.w3schools.com/jsref/met_node_insertadjacenthtml.asp
	
		addEvents(html);
	});
};

// Knoppen combo cards Robbert Tutorial
function filter(e) {
	const allArticle = document.querySelectorAll("article");
	
	allArticle.forEach(item => {
		item.classList.add("hidden");
		
		if(item.getAttribute("data-name") === e.target.value) {
			item.classList.remove("hidden");
		};
	});
};

buttons.forEach(button => {
	button.addEventListener("click", filter)
});

function filterAll() {
	const allArticle = document.querySelectorAll("article");
	
	allArticle.forEach(item => {
		item.classList.remove("hidden");
	});
};

firstBtn.addEventListener("click", filterAll);

/*
function randomNumber(min, max) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min)
};
*/

// Filter voor knoppen https://www.youtube.com/watch?v=OeMuUKedtPc&ab_channel=CodingNepal
const filterItem = document.querySelector("nav");
window.onload = () => {
	filterItem.onclick = (selectedItem) => {
		if (selectedItem.target.classList.contains("btn")) {
			filterItem.querySelector(".active").classList.remove("active");
			selectedItem.target.classList.add("active");
		};
	};
};

// Intersection observer https://www.youtube.com/watch?v=2IbRtjez6ag&t=316s&ab_channel=WebDevSimplified
function addEvents(element) {
	const cards = document.querySelectorAll(".card")
	const observer = new IntersectionObserver((entries) => {
		entries.forEach((entry) => {
			entry.target.classList.toggle("show", entry.isIntersecting)
		});
	}, {
		threshold: 0.5,
	});
	
	cards.forEach((card) => {
		observer.observe(card)
	});
};




