function makeResponsive() {

var svgWidth = 960;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 60,
  left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart, and shift the latter by left and top margins.
var svg = d3.select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

//Import Data from data.csv file
d3.csv("assets/data/data.csv")
    .then(function(healthData){

  // Step 1: Parse Data/Cast as numbers
  healthData.forEach(function(data) {
    data.age = +data.age;
    data.smokes = +data.smokes;
    data.healthcare = +data.healthcare;
    data.poverty = +data.poverty;
    data.abbr = data.abbr;
    data.income = +data.income;
  });

  // Step 2: Create scale functions
  var xLinearScale = d3.scaleLinear()
      .domain([8.5, d3.max(healthData, d => d.poverty)])
      .range([0, width]);

  var yLinearScale = d3.scaleLinear()
      .domain([3.5, d3.max(healthData, d => d.healthcare)])
      .range([height, 0]);

  // Step 3: Create axis functions
  var xAxis = d3.axisBottom(xLinearScale);
  var yAxis = d3.axisLeft(yLinearScale);

  // Step 4: Append Axes to the chart
  chartGroup.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(xAxis);

  chartGroup.append("g")
    .call(yAxis);

  // Step 5: Create Circles
  var circlesGroup = chartGroup.selectAll("circle")
  .data(healthData)
  .enter()
  .append("circle")
  .attr("cx", d => xLinearScale(d.poverty))
  .attr("cy", d => yLinearScale(d.healthcare))
  .attr("r", "10")
  .attr("fill", "blue")
  .attr("opacity", ".6")
  .attr("stroke-width", "1")
  .attr("stroke", "black");

  chartGroup.select("g")
  .selectAll("circle")
  .data(healthData)
  .enter()
  .append("text")
  .text(d => d.abbr)
  .attr("x", d => xLinearScale(d.poverty))
  .attr("y", d => yLinearScale(d.healthcare))
  .attr("dy",-395)
  .attr("text-anchor", "middle")
  .attr("font-size", "12px")
  .attr("fill", "black");

  console.log(healthData);

  //Make labels for the healthrisk graph

  chartGroup.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - 50)
    .attr("x", 0 - 250)
    .attr("dy", "1em")
    .attr("class", "axisText")
    .text("Lacks Healtcare(%)");

  chartGroup.append("text")
    .attr("transform", `translate(${width / 2.5}, ${height + margin.top + 25} )`)
    .attr("class", "axisText")
    .text("In Poverty (%)");
});
}

makeResponsive();