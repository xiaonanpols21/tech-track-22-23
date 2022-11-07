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
const chartHeight = 800

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
	.attr('height', 50) //yScale.bandwith())
	.attr('width', d => xScale(d.numberOfListeners))
	.attr('y', d => yScale(d.City))
	.attr('fill', 'url(#logo)')

d3.select('#labels')
	.selectAll('text')
	.data(dataSet)
	.join('text')
	.attr('y', d => yScale(d.City) + 15)
	.text(d => d.City);