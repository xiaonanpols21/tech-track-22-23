import * as d3 from 'd3';
import { html, thresholdScott } from 'd3';

// D3
function changeData(country) {
	// Bolletjes
	d3.select(".location")
	.selectAll("circle")
	.data(country)
	.join("circle")
	.attr("r", 5)
	.style('fill', '#862A43')

	.attr("cx", function (country) {
		return country.x;
	})
	.attr("cy", function (country) {
		return country.y;
	})
	// Bron: https://www.dashingd3js.com/d3-tutorial/using-the-svg-coordinate-space-with-d3-js
	;

	// Ranking
	d3.select(".ranking")
	.selectAll("circle")
	.data(country)
	.join("circle")
	.attr("r", 20)
	
	.style("fill", "#862A43")
	.attr("transform", "translate( -10, -30)")

	.attr("cx", function (country) {
		return country.x;
	})
	.attr("cy", function (country) {
		return country.y;
	})
	// Bron: https://www.dashingd3js.com/d3-tutorial/using-the-svg-coordinate-space-with-d3-js
	
	.on("mouseover", (e, data) => {
		const prettyNumber = d3.format(',')(data.numberOfListeners).replace(',', '.')
		d3.select(".tooltip")
		.html(`<strong>${data.city}</strong> ${prettyNumber}`)
		//.format(",")(data.numberOfListeners[0].count)
		
		.transition()
		.duration(200)
		.style("opacity", 1)
		.style("font-size", "20px")
	})

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
	.attr("transform", "translate( -16, -22)")

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
};

export {
    changeData
}