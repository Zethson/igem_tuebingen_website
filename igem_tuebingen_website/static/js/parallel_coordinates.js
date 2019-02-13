// Declare general variables
let width, height,
    chartWidth, chartHeight,
    margin,
    svg, chartLayer;
let maxPerPlot = 5000;  // maximum number of samples per dataset
let perPlotArray = [1000, 5000, 10000, 20000, 40000, 100000, 200000, 500000];
// used to toggle which dataset is shown
let dataFlag = true;
let opacity = 0.2;

// read in datasets and have proteome data as default
let proteome = reduceProteomeData();
let protein = reduceProteinData();
let data = proteome;

// Function to create plot
let createPlot = function() {
  d3.select("#pc").remove(); // clear in case of toggle

  // We create a new svg to properly clear old selection-brushes...
  svg = d3.select("#content")
    .append("svg")
    .attr("id","pc");
  chartLayer = svg.append("g")
    .classed("chartLayer", true);
  setSize();
  drawChart(data);
}

// data-reduction functions
function reduceProteomeData() {
  let arr = [];
  let counter = 0;
  for (i = 0; i < maxPerPlot; i++){
    arr.push(dark_proteomes[i]);
  }
  return arr;
}

function reduceProteinData() {
  let arr = [];
  // have reduced data be evenly distributed across domains
  let counter = {"Viruses" : 0,
                 "Eukaryota" : 0,
                 "Bacteria" : 0,
                 "Archaea" : 0};

  // Create list of 10000 for every domain. Limit has to be 10000 since the performance would be too bad
  let done = false;
  for (let i = 0; i < dark_proteins.length; i++){
    if (counter[dark_proteins[i]._domain] <= Math.floor(maxPerPlot / 4)){
      counter[dark_proteins[i]._domain] += 1;
      arr.push(dark_proteins[i]);
     
      // so we don't have to iterate the whole array:
      done = true;
      for (let k in counter) {
        if (counter[k] <= Math.floor(maxPerPlot / 4)){
          done = false;
        }
      }
      if (done) {break;}
    }
  }
  return arr;
}

// This function actually draws the lines and defines the selection-tools
function drawChart(data) {
  let xAxis = d3.scaleBand().range([0, chartWidth], 1),
      yAxis = {},  // this maps the attribute name to it's axis
      line = d3.line(),
      axis = d3.axisLeft(),
      keys = [];  // array with names of attributes


  keys = d3.keys(data[0]);

  // Delete non-numeric keys
  let remove = ['_primary_accession', '_kingdom', '_domain']
  for (let i = 0; i < remove.length; i++) {

    let index = keys.indexOf(remove[i]);
    if (index > -1) {
      keys.splice(index, 1);
    }
  }

  // selected map's the selected value-ranges of the attributes
  // using secondPlot as indication so selected ranges for both plots are separate
  let selected = keys.map(function(p) { return [0,0]; });

  // Get axis, create scales (with bounds)
  xAxis.domain(keys);
  for (let i = 0; i < keys.length; i++) {
    yAxis[keys[i]] = d3.scaleLinear().domain(d3.extent(data, function(obj) {
      let val = +obj[keys[i]];
      // if nan, return first value for that key - so the bounds keep working even if there is a missing value
      return (isNaN(val)) ? data[0][keys[i]] : val;
    })).range([chartHeight, 0]);
  }

  // Draw lines
  lines = chartLayer.append("g")
    .selectAll("path")
      .data(data)
        .enter()
        .append("path")
        .attr("d", function path(d) {
          //console.log( line(keys.map(function(dim) { return [xAxis(dim), yAxis[dim](d[dim])]})));
          return line(keys.map(function(dim) { return [xAxis(dim), yAxis[dim](d[dim])]}))})
        .attr("stroke", "deeppink")
        .style("stroke-opacity", opacity.toString())
        .attr("fill", "none");

  var g = chartLayer.selectAll(".dim")
                    .data(keys)
                    .enter().append("g")
                    .attr("transform", function(d) { return "translate(" + xAxis(d) + ")"; });

  // write up axis titles
  g.append("g")
      .each(function(d) {
         d3.select(this)
           .call(axis.scale(yAxis[d])); });
  g.append("text")
   .style("text-anchor", "middle")
   .attr("y", -9)
   .style('fill', 'white')
   .attr("cursor", "move")
   .text(function(d) { return d.substring(1); });

  // use brushing to perform axis-wise selections
  g.append("g")
    .attr("class", "brush")
    .each(function(d) {
       d3.select(this).call(yAxis[d].brush = d3.brushY().extent([[-10, 0], [10, chartHeight]])
         .on("brush start", selectInit)
         .on("brush", selectionOnAxis));
    })
    .selectAll("rect")
      .attr("x", -10)
      .attr("width", 15);

  function selectInit() {
    d3.event.sourceEvent.stopPropagation();
  }
  
  function selectionOnAxis() {
    // get selection per axis
    for (let i = 0; i < keys.length; ++i) {
      if (d3.event.target==yAxis[keys[i]].brush) {
        selected[i] = d3.event.selection.map(yAxis[keys[i]].invert, yAxis[keys[i]]);
      }
    }
  
    // toggle which lines are displayed on basis of selection indices
    lines.style("display", function(d) {
      return keys.every(function(p, i) {
        if (selected[i][0] == 0 && selected[i][0] == 0) {
          return true;
        } else {
          return selected[i][1] <= d[p] && d[p] <= selected[i][0];
        }
      }) ? null : "none";
    });
  }
}
  
// set size of svg and chartlayer.
function setSize() {
  width = 1200;
  height = 660;

  margin = {top: 50, left: 50, bottom: 50, right: 50};

  chartWidth = width - (margin.left + margin.right);
  chartHeight = height - (margin.top + margin.bottom);

  svg.attr("width", width).attr("height", height);

  chartLayer
      .attr("width", chartWidth)
      .attr("height", chartHeight)
      .attr("transform", "translate(" + [margin.left, margin.top] + ")")
}
  
  
createPlot();


// toggle which dataset is visualized
function updateData() {
  // change button text
  var elem = document.getElementById("toggleDataset");
  if (!dataFlag) elem.value = "Switch to dark_proteins.csv";
  else elem.value = "Switch to dark_proteome.csv";

  dataFlag = !dataFlag;
    if (dataFlag) {
      data = proteome;
    } else {
      data = protein;
    }
  createPlot()
}

// increase or decrease the number of samples from a given array
function plusSamples() {changeSamples(true);}
function minusSamples() {changeSamples(false);}
function changeSamples(plus){
    let samplesEl = document.getElementById("samples");
    let currentIdx = perPlotArray.indexOf(maxPerPlot);

    if (currentIdx > 0 && !plus) {currentIdx -= 1;}
    else if (currentIdx < perPlotArray.length && plus) { currentIdx += 1;}
    else {return;}
    maxPerPlot = perPlotArray[currentIdx];
    samplesEl.value = "Max. samples: ".concat(maxPerPlot.toString());
    proteome = reduceProteomeData();
    protein = reduceProteinData()
    if (dataFlag) {
      data = proteome;
    } else {
      data = protein;
    }
    createPlot();
}

// regulate opacity with a slider
d3.select("#opacity").on("input", function () {
svg.selectAll('path')
                .transition()
                .duration(100)
                .ease(d3.easeLinear)
                .style("opacity", d3.select("#opacity").property("value")/100);
});

