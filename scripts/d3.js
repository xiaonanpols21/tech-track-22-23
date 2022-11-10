import '../styles/style.scss'
import * as d3 from 'd3';

const dataSet = [
	{"City": "Jakarta", "numberOfListeners": 93,},
	{"City": "MacixoCity", "numberOfListeners": 62,},
	{"City": "Tokyo", "numberOfListeners": 53,},
	{"City": "Santiago", "numberOfListeners": 53,},
	{"City": "Dalhi", "numberOfListeners": 51,},
]

// Vincent
/*
const chartWidth = 800
const chartHeight = 400

const xScale = d3.scaleLinear()
	.domain([0, d3.max(dataSet, d => d.numberOfListeners)])
	.range([0, chartWidth]);

const yScale = d3.scaleBand()
	.domain(d3.map(dataSet, d => d.City))
	.range([0, chartHeight])
    .paddingInner(0.01);

d3.select('#bars')
	.selectAll('rect')
	.data(dataSet)
	.join('rect')
	.attr('height', 25) //yScale.bandwith())
	.attr('width', d => xScale(d.numberOfListeners))
	.attr('y', d => yScale(d.City))
	.attr("class", "bar") // Hover effect

	.on("mouseover touchstart", (e, d) =>
		d3
		.select("#tooltip")
		.transition()
		.duration(175)
		.style("opacity", 1)
		.text(`${d.City}: ${d.numberOfListeners}`)
	)
	.on("mousemove", (e) =>
		d3
		.select("#tooltip")
		.style("left", e.pageX + 15 + "px")
		.style("top", e.pageY + 15 + "px")
	)
	.on("mouseout", (e) => d3.select("#tooltip").style("opacity", 0));

d3.select('#labels')
  .selectAll('text')
  .data(dataSet)
  .join('text')
  .attr('y', d => yScale(d.City) + 15)
  .text(d => d.City);
*/

// D3 https://www.d3indepth.com/selections/

// Selections

/*
d3.selectAll('circle')
	// Grootte van circle
	.attr('r', function() {
		return 10 + Math.random() * 40;
	})
	// Click, wordt zwart oranje
	.on('click', function(e, d) {
		d3.select(this)
		  .style('fill', 'orange');
	});
*/
/*
d3.selectAll('g.item')
	.append('text')
	//.insert('text', 'circle') om circle over a te krijgen
	.text("A")
	.attr('y', 50)
	.attr('x', 30);
*/

// Data joins

/*
const myData = [40, 10, 20, 60, 30];

d3.select('.chart')
  .selectAll('circle')
  .data(myData)
  .join('circle')
  .attr('cx', function(d, i) {
    return i * 100;
  })
  .attr('cy', 50)
  .attr('r', function(d) {
    return 0.5 * d;
  })
  .style('fill', 'orange');
*/

/*
let myData = [40, 10, 20, 60, 30];
d3.select('.chart')
  .selectAll('circle')
  .data(myData)
  .join('circle')
  .attr('cx', function(d, i) {
    return i * 100;
  })
  .attr('cy', 50)
  .attr('r', function(d) {
    return 0.5 * d;
  })
  .style('fill', function(d) {
    return d > 30 ? 'orange' : 'blue';
  });
*/

/*
var cities = [
	{ name: 'London', population: 8674000},
	{ name: 'New York', population: 8406000},
	{ name: 'Sydney', population: 4293000},
	{ name: 'Paris', population: 2244000},
	{ name: 'Beijing', population: 11510000}
];
*/

/*  
 d3.select('.chart')
	.selectAll('circle')
	.data(cities)
	.join('circle')
	.attr('cx', function(d, i) {
	  return i * 100;
	})
	.attr('cy', 50)
	.attr('r', function(d) {
	  let scaleFactor = 0.000004;
	  return scaleFactor * d.population;
	})
	.style('fill', '#aaa');
*/

/*
// Join cities to rect elements and modify height, width and position
d3.select('.bars')
	.selectAll('rect')
	.data(cities)
	.join('rect')
	.attr('height', 19)
	.attr('width', function(d) {
		var scaleFactor = 0.00004;
		return d.population * scaleFactor;
	})
	.attr('y', function(d, i) {
		return i * 20;
	});

// Join cities to text elements and modify content and position
d3.select('.labels')
	.selectAll('text')
	.data(cities)
	.join('text')
	.attr('y', function(d, i) {
		return i * 20 + 13;
	})
	.text(function(d) {
		return d.name;
});
*/

// Scale function

/*
var data = [ 0, 2, 3, 5, 7.5, 9, 10 ];

var myScale = d3.scaleLinear()
	.domain([0, 10])
	.range([0, 600]);

d3.select('svg .inner')
	.selectAll('circle')
	.data(data)
	.join('circle')
	.attr('r', 3)
	.attr('cx', function(d) {
		return myScale(d);
	});

d3.select('svg .inner')
	.selectAll('text')
	.data(data)	
	.join('text')
	.attr('x', function(d) {
		return myScale(d);
	})
	.attr('y', -8)
	.text(function(d) {
		return d;
});
*/

var data = [0.243, 0.584, 0.987, 0.153, 0.433];
var extent = d3.extent(data);

var linearScale = d3.scaleLinear()
	.domain(extent)
	.range([0, 600])
	.nice();

var axis = d3.axisBottom(linearScale);

d3.select('.axis')
	.call(axis);

