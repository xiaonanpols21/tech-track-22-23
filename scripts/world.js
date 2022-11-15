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
		"x": 669.2256,
		"y": 286.5778,

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
		"x": 737.8455,
		"y": 175.6565,
	},
	{
		"city": "Santiago", 
		"numberOfListeners": 532525,
		"x": 389.5791,
		"y": 162.5977,
	},
	{
		"city": "Dalhi", 
		"numberOfListeners": 519028,
		"x": 586.8019,
		"y": 217.6862,
	},
]

const xScale = d3.scaleBand().rangeRound([[0, 1200]]).padding(0.1); // 1200 omdat width in sass 1200 is
const yScale = d3.scaleLinear().domain([0, 940000]).range(599.5202, 0); // 940000 omdat dat hoogste value is van de cities. 599.5202 omdat dat height is in sass

d3.select(".bolletjes")
	.selectAll("circle")
	.data(dataSet)
	.join("circle")

	.attr("cx", function (data) {
		return data.x;
		//return data => xScale(data.x);
	})
	.attr("cy", function (data) {
		return data.y;
		//return data => yScale(data.y);
	})
	// Bron: https://www.dashingd3js.com/d3-tutorial/using-the-svg-coordinate-space-with-d3-js
	
	.attr("r", 5)
	
	.style('fill', 'orange')

	.append("text")
	.style("color", "black")
	.text(function(data) {
		return data.city;
	})
;
