import '../styles/style.scss'
import * as d3 from 'd3';
import { filter, html } from 'd3';

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

const main = document.querySelector("main");

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
		//`<article class="${year} card">
		`<article class="card" data-name="d${year}">
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

// Filter https://www.youtube.com/watch?v=OeMuUKedtPc&ab_channel=CodingNepal
// zelfde probleem intersection observer
const filterItem = document.querySelector("nav");
window.onload = () => {
	filterItem.onclick = (selectedItem) => {
		if (selectedItem.target.classList.contains("btn")) {
			filterItem.querySelector(".active").classList.remove("active");
			selectedItem.target.classList.add("active");
		}
	}
}

// Tutorial robbert
/*
const buttons = document.querySelectorAll("nav button");

buttons.forEach(button => {
	button.addEventListener("click", filter);
});

for(let i = 1; 9 < 6; i++) {
	let newEl = document.createElement("article");
	newEl.setAttribute("data-name", i);
	newEl.innerHTML = `Jaar: ${i}`;
	main.appendChild(newEl);
};

function filter(e) {
	let allItems = document.querySelectorAll("article")
		
	allItems.forEach(item => {
		item.classList.add('hidden');
		
		if(item.getAttribute('data-name') === e.target.value) {
			console.log('match!', e.target.value);
			item.classList.remove('hidden');
		}
	})
};
*/

// TODO: , filter year slider, object server

// Intersection observer https://www.youtube.com/watch?v=2IbRtjez6ag&t=316s&ab_channel=WebDevSimplified
function addEvents(element) {
	const cards = document.querySelectorAll(".card")
	const observer = new IntersectionObserver((entries) => {
		entries.forEach((entry) => {
			entry.target.classList.toggle("show", entry.isIntersecting)
		})
	})

	cards.forEach((card) => {
		observer.observe(card)
	});
}




