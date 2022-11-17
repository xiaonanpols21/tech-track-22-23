import '../styles/style.scss'
import * as d3 from 'd3';
import { html, thresholdScott } from 'd3';
import gsap from "gsap";

// Data
const urls = ['./data/bts-albums.json', './data/bts-overview.json'];

// Dark Mode
const darkBtn = document.querySelector("header button");
const body = document.querySelector("body");

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

	const country = data[1].data.artist.stats.topCities.items.map(item => {
		return item;
	});
	console.log(country);
});

// D3
const dataSet = [
	{
		"id": 1, 
		"city": "Jakarta", 
		"numberOfListeners": 930904,
		"x": 672,
		"y": 290,

	},
	{
		"id": 2, 
		"city": "Macixocity", 
		"numberOfListeners": 622728,
		"x": 186.7382,
		"y": 233.5412,
	},
	{
		"id": 3, 
		"city": "Tokyo", 
		"numberOfListeners": 533701,
		"x": 745,
		"y": 178,
	},
	{
		"id": 4, 
		"city": "Santiago", 
		"numberOfListeners": 532525,
		"x": 395,
		"y": 162.5977,
	},
	{
		"id": 5, 
		"city": "Dalhi", 
		"numberOfListeners": 519028,
		"x": 590,
		"y": 220,
	},
];

// Bolletjes
d3.select(".location")
	.selectAll("circle")
	.data(dataSet)
	.join("circle")
	.attr("r", 5)
	.style('fill', '#FB879E')

	.attr("cx", function (data) {
		return data.x;
	})
	.attr("cy", function (data) {
		return data.y;
	})
	// Bron: https://www.dashingd3js.com/d3-tutorial/using-the-svg-coordinate-space-with-d3-js
;

// Rect
d3.select(".location")
	.selectAll("rect")
	.data(dataSet)
	.join("rect")
	.attr("width", 170)
	.attr("height", 60)
	.attr('transform', 'translate( -40, -60)')
	.style('fill', '#FB879E')
	.attr("x", function (data) {
		return data.x;
	})
	.attr("y", function (data) {
		return data.y;
	})
;

// Bg
d3.select(".d3-bg")
	.selectAll("rect")
	.data(dataSet)
	.join("rect")
	.attr("width", 170)
	.attr("height", 60)
	.attr("transform", "translate( -35, -55)")
	.style("fill", "white")
	.attr("x", function (data) {
		return data.x;
	})
	.attr("y", function (data) {
		return data.y;
	})
;

// Bolletjes
d3.select(".d3-bg")
	.selectAll("circle")
	.data(dataSet)
	.join("circle")
	.attr("r", 5)
	.attr("transform", "translate( 5, 5)")
	.style("fill", "white")

	.attr("cx", function (data) {
		return data.x;
	})
	.attr("cy", function (data) {
		return data.y;
	})
	// Bron: https://www.dashingd3js.com/d3-tutorial/using-the-svg-coordinate-space-with-d3-js
;

// Id
d3.select(".text-3")
	.selectAll("text")
	.data(dataSet)

	.join('text')
	.style("font-size", "23px")
	.style("fill", "white")
	.style("font-weight", "bold")
	.attr("transform", "translate( -16, -22)")

	.text(function(data) {
		return data.id;
	})
	.attr("x", function (data) {
		return data.x;
	})
	.attr("y", function (data) {
		return data.y;
	})
;

// Ranking
d3.select(".ranking")
	.selectAll("circle")
	.data(dataSet)
	.join("circle")
	.attr("r", 20)
	.style("fill", "#862A43")
	.attr("transform", "translate( -10, -30)")

	.attr("cx", function (data) {
		return data.x;
	})
	.attr("cy", function (data) {
		return data.y;
	})
	// Bron: https://www.dashingd3js.com/d3-tutorial/using-the-svg-coordinate-space-with-d3-js
;

// Country
d3.select(".text-1")
	.selectAll("text")
	.data(dataSet)

	.join("text")
	.style("font-size", "18px")
	.style("font-weight", "bold")
	.style("fill", "white")
	.attr("transform", "translate( 20, -35)")

	.text(function(data) {
		return data.city;
	})
	.attr("x", function (data) {
		return data.x;
	})
	.attr("y", function (data) {
		return data.y;
	})
;

// NumberOfListeners
d3.select(".text-2")
	.selectAll('text')
	.data(dataSet)

	.join("text")
	.style("font-size", "14px")
	.style("fill", "white")
	.attr("transform", "translate( 20, -15)")

	.text(function(data) {
		return data.numberOfListeners;
	})
	.attr("x", function (data) {
		return data.x;
	})
	.attr("y", function (data) {
		return data.y;
	})
;

// Gsap
// Rectangles
gsap.fromTo(".location", 
	{
		y: 400
	}, {
		y: 0,
		duration: 1
	}
);

gsap.fromTo(".d3-bg", 
	{
		y: 400
	}, {
		y: 0,
		duration: 1
	}
);

// Text
const animation = gsap.timeline();
animation
	.fromTo(".text-1", {
		opacity: 0
	}, {
		opacity: 1,
		duration: 0.5,
		delay: 1
	})

	.fromTo(".text-2", {
		opacity: 0
	}, {
		opacity: 1,
		duration: 0.5 
	}
);

gsap.fromTo(".ranking", {
	scale: 0,
}, {
	scale: 1,
	duration: 0.5,
	delay: 1
});

gsap.fromTo(".text-3", {
	scale: 5,
	rotation: 360
}, {
	scale: 1,
	rotation: 0,
	duration: 1,
	delay: 1
})