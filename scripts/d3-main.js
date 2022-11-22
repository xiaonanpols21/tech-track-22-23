import * as d3 from 'd3';
import { html, thresholdScott } from 'd3';

function countData(countAlbum) {
	const chartWidth = 700
	const chartHeight = 500

	const xScale = d3.scaleLinear()
		.domain([0, d3.max(countAlbum, d => d.count)])
		.range([0, chartWidth]);

	const yScale = d3.scaleBand()
		.domain(d3.map(countAlbum, d => d.year))
		.range([0, chartHeight])
		.paddingInner(0.05);

	// Bar color func
	function colorPicker(d) {
		if (d.count <= 2) {
			return "#FB879E";
		} else if (d.count > 2) {
			return "#8CC5FC";
		}
	}
	// Bron: https://codepen.io/bluelegion/pen/EyJyvx?editors=0010

	d3.select('.bars')
		.selectAll('rect')
		.data(countAlbum)
		.join('rect')
		.attr('height', 30)
		.attr("rx", "15")
		
		.style("fill", function(d, i) {
			return  colorPicker(d); 
		})

		.attr('width', d => xScale(d.count))
		.attr('y', d => yScale(d.year))

		// Hove effect tooltip
		.on("mouseover touchstart", (e, d) =>
			d3
			.select(".tooltipI")
			.html(`<strong>${d.year}:</strong> ${d.count} album(s)`)
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
		.data(countAlbum)
		.join('text')
		.attr('y', d => yScale(d.year) + 15)
		.text(d => d.year)
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
};

export {
    countData
};