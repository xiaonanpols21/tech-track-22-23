import "../styles/style.scss"; 

// Import JS files
import * as v from "./variables.js"; 
import * as func from "./functions.js"; 
//import * as gsap from "./gsap.js"; 
import * as zero from "./zeroGone.js"; 

import * as d3 from 'd3';
import { html, thresholdScott } from 'd3';

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

	// Bron: https://stackoverflow.com/questions/51067921/javascript-count-key-value-pairs
	const newArray = Object.values(albums.reduce((c, {year}) => {
		c[year] = c[year] || {year: year, count: 0};
		c[year].count++;
		return c;
	}, {}));

	console.log(newArray);

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
		
		func.addEvents(html);
		
	});
};

const dataSet = [
	{"Jaar":2013,"Aantal":2},
	{"Jaar":2014,"Aantal":4},
	{"Jaar":2015,"Aantal":2},
	{"Jaar":2016,"Aantal":3},
	{"Jaar":2017,"Aantal":2},
	{"Jaar":2018,"Aantal":3},
	{"Jaar":2019,"Aantal":1},
	{"Jaar":2020,"Aantal":3},
	{"Jaar":2021,"Aantal":0},
	{"Jaar":2022,"Aantal":1},
]

// D3
const chartWidth = 700
const chartHeight = 500

const xScale = d3.scaleLinear()
	.domain([0, d3.max(dataSet, d => d.Aantal)])
	.range([0, chartWidth]);

const yScale = d3.scaleBand()
	.domain(d3.map(dataSet, d => d.Jaar))
	.range([0, chartHeight])
	.paddingInner(0.05);

// Bar color func
function colorPicker(d) {
	if (d.Aantal <= 2) {
		return "#FB879E";
	} else if (d.Aantal > 2) {
		return "#8CC5FC";
	}
}
// Bron: https://codepen.io/bluelegion/pen/EyJyvx?editors=0010

d3.select('.bars')
	.selectAll('rect')
	.data(dataSet)
	.join('rect')
	.attr('height', 30)
	.attr("rx", "15")
	
	.style("fill", function(d, i) {
		return  colorPicker(d); 
	})

	.attr('width', d => xScale(d.Aantal))
	.attr('y', d => yScale(d.Jaar))

	// Hove effect tooltip
	.on("mouseover touchstart", (e, d) =>
		d3
		.select(".tooltipI")
		.html(`<strong>${d.Jaar}:</strong> ${d.Aantal} album(s)`)
		.transition()
		.duration(200)
		.style("opacity", 1)
		
	)

	.on("mousemove", (e) =>
		d3
		.select(".tooltipI")
		.style("left", e.pageX - 250 + "px")
		.style("top", e.pageY - 20 + "px")
	)

	.on("mouseout", e => d3.select(".tooltipI").style("opacity", 0)
	);
;

d3.select('.labels')
	.selectAll('text')
	.data(dataSet)
	.join('text')
	.attr('y', d => yScale(d.Jaar) + 15)
	.text(d => d.Jaar)
;

// Lagenda
d3.select(".legenda-1")
	.append("circle")
	.attr("cx", 20)
	.attr("cy", 550)
	.attr("r", 20)
	.style("fill", "#FB879E")
;

d3.select(".legenda-1")
	.append("text")
	.attr("x", 50)
	.attr("y", 550)
	.text("2 or less albums")
	.style("font-size", "20px")
	.attr("alignment-baseline","middle")
;

d3.select(".legenda-2")
	.append("circle")
	.attr("cx", 260)
	.attr("cy", 550) 
	.attr("r", 20)
	.style("fill", "#8CC5FC")
;

d3.select(".legenda-2")
	.append("text")
	.attr("x", 290)
	.attr("y", 550)
	.text("More than 2 albums")
	.style("font-size", "20px")
	.attr("alignment-baseline","middle")
;
// Bron: https://d3-graph-gallery.com/graph/custom_legend.html