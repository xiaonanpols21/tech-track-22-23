import '../styles/style.scss'
import * as d3 from 'd3';

const dataSet = [
	{"City": "Jakarta", "numberOfListeners": 930904,},
	{"City": "MacixoCity", "numberOfListeners": 622728,},
	{"City": "Tokyo", "numberOfListeners": 533701,},
	{"City": "Santiago", "numberOfListeners": 532525,},
	{"City": "Dalhi", "numberOfListeners": 519028,},
]

const chartWidth = 700
const chartHeight = 300

// Horizontal barchart
const xScale = d3.scaleLinear()
	.domain([0, d3.max(dataSet, d => d.numberOfListeners)])
	.range([0, chartWidth]);

const yScale = d3.scaleBand()
	.domain(d3.map(dataSet, d => d.City))
	.range([0, chartHeight])
  	.paddingInner(0.05);

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
		.duration(1000)
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

// YT Barchart
const xScales = d3.scaleBand();

const container = d3.select(".div")
	.classed("container", true);

const bars = container 
	.selectAll(".bar")
	.data(dataSet)
	.enter()
	.append("rect")
	.classed("bar", true);
