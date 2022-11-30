import * as d3 from "d3";
import { count, html, thresholdScott } from "d3";

function countData(countAlbum) {
  const chartWidth = 700;
  const chartHeight = 500;

  const xScale = d3
    .scaleLinear()
    .domain([0, d3.max(countAlbum, d => d.count)])
    .range([0, chartWidth]);

  const yScale = d3
    .scaleBand()
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

  function update(countAlbum, buttonPressed, whichBtn) {
    let newData;
    if (buttonPressed) {
      if (whichBtn == 1) {
        newData = countAlbum.filter(d => d.count <= 2);
      } else {
        newData = countAlbum.filter(d => d.count > 2);
      }
    } else {
      newData = countAlbum;
    }

    d3.select(".bars")
      .selectAll("rect")
      .data(newData)
      .join("rect")
      .attr("height", 30)
      .attr("rx", "15")
      .style("fill", d => 
        colorPicker(d)
      )

      .attr("width", d => xScale(d.count))
      .attr("y", d => yScale(d.year))

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
          .style("left", `${e.pageX - 250}px`)
          .style("top", `${e.pageY - 20}px`)
      )
      
      .on("mouseout", (e) => 
        d3
          .select(".tooltipI")
          .style("opacity", 0)
      );

    d3.select(".labels")
      .selectAll("text")
      .data(countAlbum)
      .join("text")
      .attr("y", (d) => yScale(d.year) + 15)
      //TODO: Fix this
      .text(d => d.year);
  }

  update(countAlbum);

  d3.selectAll(".filter-btn")
  .on("click", e => {
    update(countAlbum, true, e.target.value);
  });
  // Bron: https://codepen.io/pen
}

export { countData };
