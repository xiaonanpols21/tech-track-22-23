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

	changeData(country);

});

// D3
function changeData(country) {
	// Bolletjes
	/*
	d3.select(".location")
	.selectAll("circle")
	.data(country)
	.join("circle")
	.attr("r", 5)
	.style('fill', '#FB879E')

	.attr("cx", function (country) {
		return country.x;
	})
	.attr("cy", function (country) {
		return country.y;
	})
	// Bron: https://www.dashingd3js.com/d3-tutorial/using-the-svg-coordinate-space-with-d3-js
	;
	*/

	// Rect
	/*
	d3.select(".location")
	.selectAll("rect")
	.data(country)
	.join("rect")
	.attr("width", 180)
	.attr("height", 60)
	.attr('transform', 'translate( -40, -60)')
	.style('fill', '#FB879E')
	.attr("x", function (country) {
		return country.x;
	})
	.attr("y", function (country) {
		return country.y;
	})
	;
	*/

	// Bg
	/*
	d3.select(".d3-bg")
	.selectAll("rect")
	.data(country)
	.join("rect")
	.attr("width", 180)
	.attr("height", 60)
	.attr("transform", "translate( -35, -55)")
	.style("fill", "white")
	.attr("x", function (country) {
		return country.x;
	})
	.attr("y", function (country) {
		return country.y;
	})
	;
	*/

	// Bolletjes
	/*
	d3.select(".d3-bg")
	.selectAll("circle")
	.data(country)
	.join("circle")
	.attr("r", 5)
	.attr("transform", "translate( 5, 5)")
	.style("fill", "white")

	.attr("cx", function (country) {
		return country.x;
	})
	.attr("cy", function (country) {
		return country.y;
	})
	// Bron: https://www.dashingd3js.com/d3-tutorial/using-the-svg-coordinate-space-with-d3-js
	;
	*/

	// Ranking
	d3.select(".ranking")
	.selectAll("circle")
	.data(country)
	.join("circle")
	.attr("r", 20)
	
	.style("fill", "#862A43")
	//.attr("transform", "translate( -10, -30)")

	.attr("cx", function (country) {
		return country.x;
	})
	.attr("cy", function (country) {
		return country.y;
	})
	// Bron: https://www.dashingd3js.com/d3-tutorial/using-the-svg-coordinate-space-with-d3-js
	
	.on("mouseover", (e, data) =>
		d3.select(".tooltip")
		.transition()
		.duration(200)
		.style("opacity", 1)
		.text(`${data.city} ${data.numberOfListeners}`)
  	)

	.on("mousemove", (e) =>
			d3.select(".tooltip")
			.style("left", e.pageX + -0 + "px")
			.style("top", e.pageY + -120 + "px")
	)

	.on("mouseout", e => 
		d3.select(".tooltip")
		.style("opacity", 0)
	)
	// Bron: https://codepen.io/vijnv/pen/RwJKBeO?editors=1010
	;

	// Id
	d3.select(".ranking")
	.selectAll("text")
	.data(country)

	.join('text')
	.style("font-size", "23px")
	.style("fill", "white")
	.style("font-weight", "bold")
	.attr("transform", "translate( -6, 8)")

	.text(function(country) {
		return country.id;
	})
	.attr("x", function (country) {
		return country.x;
	})
	.attr("y", function (country) {
		return country.y;
	})
	;

	// Country
	/*
	d3.select(".text-1")
	.selectAll("text")
	.data(country)

	.join("text")
	.style("font-size", "18px")
	.style("font-weight", "bold")
	.style("fill", "white")
	.attr("transform", "translate( 20, -35)")

	.text(function(country) {
		return country.city;
	})
	.attr("x", function (country) {
		return country.x;
	})
	.attr("y", function (country) {
		return country.y;
	})
	;
	*/

	// NumberOfListeners
	/*
	d3.select(".text-2")
	.selectAll('text')
	.data(country)

	.join("text")
	.style("font-size", "14px")
	.style("fill", "white")
	.attr("transform", "translate( 20, -15)")

	.text(function(country) {
		return country.numberOfListeners;
		d3.format(".")(playCountSet[0].count);
	})
	.attr("x", function (country) {
		return country.x;
	})
	.attr("y", function (country) {
		return country.y;
	})
	;
	*/
};

// Gsap
// Rectangles
/*
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
})*/