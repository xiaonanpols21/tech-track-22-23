import "../styles/style.scss"; 

import * as v from "./variables.js"; 

import * as d3 from 'd3';
import { html, thresholdScott } from 'd3';
//import gsap from "gsap";

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

	console.log(data);
	changeData(data, albums);
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
		
		addEvents(html);
		
	});
};

// ****************************************

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

v.buttons.forEach(button => {
	button.addEventListener("click", filter)
});

function filterAll() {
	const allArticle = document.querySelectorAll("article");
	
	allArticle.forEach(item => {
		item.classList.remove("hidden");
	});
};

v.firstBtn.addEventListener("click", filterAll);

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

// Dark mode button
function darkMode() {
	body.classList.toggle("dark-mode");
};
v.darkBtn.addEventListener("click", darkMode);

// ****************************************

// Gsap
// Zero state
gsap.to(".zero-state .play", {
	rotation: 360,
	duration: 3,
	//repeat: -1
});

gsap.fromTo(".zero-img", 
	{
		rotation: -180,
		transformOrigin: "left bottom"
	}, {
		rotation: 0,
		duration: 2
	}
);

const animation = gsap.timeline();
animation
	.fromTo(".zero-state h4", 
	{
		y: 400
	}, {
		y: 0,
		duration: 0.5
	})
	.fromTo(".zero-state p", 
	{
		y: 400
	}, {
		y: 0,
		duraration: 0.5,
		stagger: 0.2
	});

gsap.fromTo(".show-timeline",
	{
		scale: 5,
		opacity: 0
	}, {
		scale: 1,
		opacity: 1,
		duration: 1
	}
);

// Reversed bron: https://codepen.io/PointC/pen/WqKyye?editors=0010
v.gBtn.to("header button", {
	rotation: 180,
	duration: 0.3
});

v.gBtn.reversed(true);

function dgsap() {
	v.gBtn.reversed(!gBtn.reversed());
};
v.darkBtn.addEventListener("click", dgsap);

// Function Zero state button Gsap
function zeroStateGone() {
	const Timeout = setTimeout(zeroHidden, 1000);
	function zeroHidden() {
		v.zeroBg.classList.add("hidden");
	};

	v.audio.pause();

	gsap.fromTo(".zero-state", 
	{
		opacity: 1
	}, {
		opacity: 0,
		duration: 1
	});

	gsap.fromTo(".zero-state section", 
	{
		scale: 1,
		opacity: 1
	}, {
		scale: 3,
		opacity: 0,
		duration: 1
	});

	gsap.fromTo(".zero-state div", 
	{
		scale: 1,
		opacity: 1
	}, {
		scale: 3,
		opacity: 0,
		duration: 1
	});

	// Nav buttons
	gsap.fromTo("nav button", 
	{
		x :-200,
		opacity: 0
	}, {
		x: 0,
		opacity: 1,
		stagger: 0.2,
		duration: 0.2
	});

	// Header img
	gsap.to("header img", {
		rotation: 360,
		duration: 3
	});
}
v.showBtn.addEventListener("click", zeroStateGone);