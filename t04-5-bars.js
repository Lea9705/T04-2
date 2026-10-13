// t04-5-bars.js
const createBarChart = (data) => {
  // --- Sizes (logical vs. display) ---
  const viewW = 500;
  const viewH = Math.max(220, data.length * 28);
  const displayW = 640;
  const displayH = Math.min(480, data.length * 24 + 40);

  // --- SVG root ---
  const svg = d3.select(".responsive-svg-container")
    .append("svg")
    .attr("viewBox", `0 0 ${viewW} ${viewH}`)
    .attr("width", displayW)
    .attr("height", displayH)
    .style("border", "1px solid #ccc");

  // Space reserved for labels.
  // The exercise uses 100; 140 gives long brand names (e.g. "Samsung Electronics")
  // enough room so they are not cut off at the left edge.
  const labelX = 140;      // bars start here; brand labels end here
  const valueRoom = 40;    // space kept on the right for the number labels

  // --- Scales (from T04-6) ---
  const xMax = d3.max(data, d => d.count);
  const xScale = d3.scaleLinear()
    .domain([0, xMax])
    // Bars now start at labelX, so they get the width that is left over.
    // (Using [0, viewW] would push the longest bar past the right edge.)
    .range([0, viewW - labelX - valueRoom]);

  const yScale = d3.scaleBand()
    .domain(data.map(d => d.brand))
    .range([0, viewH])
    .paddingInner(0.2)
    .paddingOuter(0.1);

  // OLD rectangle-only drawing block from T04-6 (COMMENTED OUT for T04-7)
  /*
  svg.selectAll("rect")
    .data(data)
    .join("rect")
    .attr("class", d => `bar bar-${d.count}`)
    .attr("x", 0)
    .attr("y", d => yScale(d.brand))
    .attr("width", d => xScale(d.count))
    .attr("height", yScale.bandwidth())
    .attr("fill", "steelblue");
  */

  // --- NEW in T04-7: one group per row (bar + labels move together) ---
  const barAndLabel = svg
    .selectAll("g")
    .data(data)
    .join("g")
    .attr("transform", d => `translate(0, ${yScale(d.brand)})`);

  // --- Bar rectangle inside the group ---
  // y is 0 because the group already sets the vertical position.
  barAndLabel
    .append("rect")
    .attr("class", d => `bar bar-${d.count}`)
    .attr("x", labelX)                        // bar starts where the labels end
    .attr("y", 0)
    .attr("width", d => xScale(d.count))      // scaled width
    .attr("height", yScale.bandwidth())       // bar thickness from band scale
    .attr("fill", "steelblue");

  // Vertical middle of each bar, so both labels line up with the bar's centre
  const labelY = yScale.bandwidth() / 2;

  // --- Category text (left of bar, right-aligned at labelX) ---
  barAndLabel
    .append("text")
    .text(d => d.brand)
    .attr("x", labelX - 6)                    // small gap before the bar
    .attr("y", labelY)
    .attr("dy", "0.35em")                     // nudges text down to sit centred
    .attr("text-anchor", "end")               // right-align: text ends at labelX
    .style("font-family", "sans-serif")
    .style("font-size", "13px");

  // --- Value text (just past the end of each bar) ---
  barAndLabel
    .append("text")
    .text(d => d.count)
    .attr("x", d => labelX + xScale(d.count) + 4)
    .attr("y", labelY)
    .attr("dy", "0.35em")
    .style("font-family", "sans-serif")
    .style("font-size", "13px");
};
