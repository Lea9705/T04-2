// t04-5-bars.js
const createBarChart = (data) => {
  // SVG internal coordinate system used to position and size chart elements
  const viewW = 500;   // logical width available for the chart
  const viewH = 1600;  // logical height available for all bars

  // SVG rendered size displayed on the webpage
  const displayW = 640; // visible width of the SVG
  const displayH = 420; // visible height of the SVG

  const svg = d3.select(".responsive-svg-container")
    .append("svg")
    .attr("viewBox", `0 0 ${viewW} ${viewH}`) // defines the internal coordinate system
    .attr("width", displayW)                  // sets the displayed width
    .attr("height", displayH)                 // sets the displayed height
    .style("border", "1px solid black");

  // X scale (numeric)
  const xMax = d3.max(data, d => d.count); // largest count in the dataset
  const xScale = d3.scaleLinear()
    .domain([0, xMax])  // input: data values from 0 to the highest count
    .range([0, viewW]); // output: 0 to the SVG's logical width

  // Y scale (categorical)
  const yScale = d3.scaleBand()
    .domain(data.map(d => d.brand)) // brand names are the categories
    .range([0, viewH])              // spread them from top to bottom
    .paddingInner(0.2)              // space between neighbouring bars
    .paddingOuter(0.1);             // space before the first and after the last bar

  // Bars
  svg.selectAll("rect")
    .data(data)                                  // connect the dataset to the rectangles
    .join("rect")                                // one rect per row
    .attr("class", d => `bar bar-${d.count}`)    // general + count-specific class
    .attr("x", 0)                                // start every bar at the left edge
    .attr("y", d => yScale(d.brand))             // vertical position from the brand
    .attr("width", d => xScale(d.count))         // scaled bar width
    .attr("height", yScale.bandwidth())          // bar thickness from the band scale
    .attr("fill", "steelblue");                  // bar colour
};
