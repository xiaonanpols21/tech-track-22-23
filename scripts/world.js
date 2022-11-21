import '../styles/style.scss'

// Import JS files
import * as v from "./variables.js"; 
import * as d from "./d3.js"; 

import gsap from "gsap";

// Dark Mode
function darkMode() {
	body.classList.toggle("dark-mode");
};
v.darkBtn.addEventListener("click", darkMode);

const dataSet = [
	{
		"id": 1, 
		"city": "Jakarta", 
		"x": 672,
		"y": 290,
	},
	{
		"id": 2, 
		"city": "Mexico City", 
		"x": 186.7382,
		"y": 233.5412,
	},
	{
		"id": 3, 
		"city": "Tokyo", 
		"x": 745,
		"y": 178,
	},
	{
		"id": 4, 
		"city": "Santiago", 
		"x": 395,
		"y": 162.5977,
	},
	{
		"id": 5, 
		"city": "Delhi", 
		"x": 590,
		"y": 220,
	},
];

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

	// Gwet only countries of the full dataset
	const country = data[1].data.artist.stats.topCities.items.map(item => {
		return item;
	});

	//Add dataSet to country dataset
	country.map(e => {
		console.log(e.city)
		let cityLocation = dataSet.filter(d => d.city === e.city);
		e.x = cityLocation[0].x;
		e.y = cityLocation[0].y;
		e.id = cityLocation[0].id;
		return e;
	})
	
	console.log(country);
	d.changeData(country);

});

// Gsap
const animation = gsap.timeline();
animation
gsap.fromTo(".location", 
	{
		opacity: 0
	}, {
		opacity: 1,
		duration: 1
	}
)

gsap.fromTo(".ranking", {
	scale: 10,
	rotation: 0
}, {
	scale: 1,
	rotation: 360,
	duration: 0.5,
	delay: 0.5
});
