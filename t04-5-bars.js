// t04-5-bars.js
const createBarChart = (data) => {
  // Step 1B: create the SVG canvas inside the responsive container
  const svg = d3.select(".responsive-svg-container")
    .append("svg")
    .attr("viewBox", "0 0 1200 400") // temporary; we'll adjust layout soon
    .style("border", "1px solid black"); // dev-only border so we see the canvas

  // Step 1B: bind the data -> one <rect> per row
  svg
    .selectAll("rect")
    .data(data)
    .join("rect")
    // Step 1C: class tied to the data, e.g. "bar bar-859"
    .attr("class", d => `bar bar-${d.count}`)
    // Step 2: width from the data, constant height
    .attr("width", d => d.count) // uses the numeric column directly
    .attr("height", 16);         // constant bar height

    // Step 3 (optional idea – spacing is done properly in T04-6):
    // remove the semicolon above and un-comment these two lines to space the bars out
    // .attr("x", 0)
    // .attr("y", (d, i) => i * (16 + 5)); // row number × (bar height + 5px gap)
};
