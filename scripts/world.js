import '../styles/style.scss'
import * as d3 from 'd3';
import { html, thresholdScott } from 'd3';

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

const dataSet = [
	{
		"city": "Jakarta", 
		"numberOfListeners": 930904,
		"x": 672,
		"y": 290,

	},
	{
		"city": "Macixocity", 
		"numberOfListeners": 622728,
		"x": 186.7382,
		"y": 233.5412,
	},
	{
		"city": "Tokyo", 
		"numberOfListeners": 533701,
		"x": 745,
		"y": 178,
	},
	{
		"city": "Santiago", 
		"numberOfListeners": 532525,
		"x": 395,
		"y": 162.5977,
	},
	{
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
	.attr("width", 150)
	.attr("height", 60)
	.attr('transform', 'translate(-20, -60)')
	.style('fill', '#FB879E')
	.attr("x", function (data) {
		return data.x;
	})
	.attr("y", function (data) {
		return data.y;
	})
;


// Country
d3.select(".text-1")
	.selectAll('text')
	.data(dataSet)

	.join('text')
	.style("font-size", "20px")
	.style("font-weight", "bold")
	.style('fill', 'white')
	.attr('transform', 'translate(-20, -40)')

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

	.join('text')
	.style("font-size", "16px")
	.style('fill', 'white')
	.attr('transform', 'translate(-20, -20)')

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