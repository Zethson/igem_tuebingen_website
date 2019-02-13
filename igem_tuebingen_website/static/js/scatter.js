data_virus = [];
data_eukaryota = [];
data_bacteria = [];
data_archaea = [];
num_datapoints = 7500;

// Create list of 7500 for every domain. Limit has to be 10000 since the performance would be too bad
for (let i = 0; i < dark_proteins.length; i++){
  if ((data_virus.length < num_datapoints) && (dark_proteins[i]._domain == "Viruses")){
    data_virus.push(dark_proteins[i])
  }
  else if ((data_eukaryota.length < num_datapoints) && (dark_proteins[i]._domain == "Eukaryota")){
    data_eukaryota.push(dark_proteins[i])
  }
  else if ((data_bacteria.length < num_datapoints) && (dark_proteins[i]._domain == "Bacteria")){
    data_bacteria.push(dark_proteins[i])
  }
  else if ((data_archaea.length < num_datapoints) && (dark_proteins[i]._domain == "Archaea")){
    data_archaea.push(dark_proteins[i])
  }
}

// Options for the plot (domains and attributes)
let domainMap = { "Eukaryota": data_eukaryota,
                  "Viruses": data_virus,
                  "Bacteria": data_bacteria,
                  "Archaea": data_archaea
                };

let attributeMap = {"Membrane": "_membrane",
                    "Disorder": "_disorder",
                    "Compositional bias": "_compositional_bias"
                    };

// Main function
function createDensityPlot(domainMap, attributeMap){
// Important letiables
  let margin = {top: 70, right: 70, bottom: 170, left: 70};
  let svgHeight = 800;
  let svgWidth = 800;
  let myChartWidth = svgWidth - margin.left - margin.right;
  let myChartHeight = svgHeight - margin.top - margin.bottom;
  let dot_radius = 3;
  let currentAttribute = NaN;
  let currentDomain = NaN;

  // create scale objects
  let xScale = d3.scaleLinear()
    .domain([0, 100])
    .range([0, myChartWidth]);
  let yScale = d3.scaleLinear()
    .domain([0, 100])
    .range([myChartHeight, 0]);

  // create axis objects
  let xAxis = d3.axisBottom(xScale)
    .ticks(10, "s");
  let yAxis = d3.axisLeft(yScale)
    .ticks(10, "s");

  let svg = d3.select('#content_scatter').append("svg")
        .attr("width", svgWidth)
        .attr("height", svgHeight);

// Creates and updates the complete chart
let updateChart = function(data, key){

  // create a clipping region
svg.append("defs").append("clipPath")
    .attr("id", "clip")
  .append("rect")
    .attr("width", myChartWidth)
    .attr("height", myChartHeight);

let div = d3.select("#content_scatter").append("div")
    .attr("class", "tooltip_SL");

// Place Axis
let g_XAxis = svg.append('g')
  .attr('transform', 'translate(' + margin.left + ',' + (margin.top + myChartHeight) + ')')
  .attr("class", "axisScatter_SL")
  .call(xAxis);
let g_YAxis = svg.append('g')
  .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
  .attr("class", "axisScatter_SL")
  .call(yAxis);

  // X-Axis labeling
	svg.append("text")
	  .attr("transform",
			"translate(" + (svgWidth/2 ) + " ," + (myChartHeight + 110) + ")")
    .attr("class", 'axisLabel_SL')
	  .text(key + " [%]");

  // Y-Axis labeling
	svg.append("text")
		  .attr("transform", "rotate(-90)")
		  .attr("y", 30)
		  .attr("x",0 - (svgHeight / 2) + 50)
      .attr("class", 'axisLabel_SL')
		  .text("Darkness [%]");

  // encapsulating points and invisible background (+ clipping)
  let plot_surface = svg.append("g")
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
    .attr("clip-path", "url(#clip)")
    .classed("plot_surface_SL", true);

  // Pan and zoom
  let zoom = d3.zoom()
    .scaleExtent([0.95, 10])
    //.translateExtent([[-20, -20], [620, 620]])
    .on("zoom", zoomed);

  //invisible background rectangle for zoom and dragging
  plot_surface.append("rect")
  .attr("class", "zoomRect_SL")
  .attr("width", myChartWidth)
  .attr("height", myChartHeight);
  //.style("fill", "transparent")

  // actual datapoints
  let points = plot_surface.selectAll(".dot")
        .data(data)
        .enter().append("circle")
        .classed("dot_SL", true)
        .attr('cx', function(d) {return xScale(Number(d[attributeMap[key]]))})
        .attr('cy', function(d) {return yScale(Number(d["_darkness"]) * 100)}) // darkness is between 0 and 1, whereas the rest is 0 to 100 --> scaling times 100
        .attr('r', dot_radius)
        .attr("fill-opacity","0.4")
        .attr('pointer-events', 'all')
        .on('mouseover', function(d) { // show tooltip
            div.transition()
              .duration(200)
              .style("opacity", 1);
            div.html("ID: " + d._primary_accession + "<br>" + "Kingdom: " + d._kingdom) // Tooltip
             .style("left", (d3.event.pageX) + "px")
             .style("top", (d3.event.pageY - 30) + "px");})
        .on("mouseout", function(d) {
            div.transition()
             .duration(400)
             .style("opacity", 0);});
  plot_surface
  .call(zoom)// call zoom
  .call(zoom.transform, d3.zoomIdentity.translate(10, 5).scale(0.97)); // set inital zoom level

  // Zoom function
  function zoomed() {
    // create new scale ojects based on event
    let updated_xScale = d3.event.transform.rescaleX(xScale);
    let updated_yScale = d3.event.transform.rescaleY(yScale);
    // update axes
    g_XAxis.call(xAxis.scale(updated_xScale));
    g_YAxis.call(yAxis.scale(updated_yScale));
    points.data(data)
     .attr('cx', function(d) {return updated_xScale(Number(d[attributeMap[key]]))})
     .attr('cy', function(d) {return updated_yScale(Number(d["_darkness"]) * 100)});
    }
};

    // create dropdown menu for attribute
    let dropdownChangeAttribute = function() {
        let newAttribute = d3.select(this).property('value');
        currentAttribute = newAttribute;
        svg.selectAll("*").remove();
        updateChart(domainMap[currentDomain] ,newAttribute); // update chart
    };

    let myAttributes = Object.keys(attributeMap); // list of attribute keys

    let dropdownAttribute = d3.select("#my-menu-attribute")
                    .insert("select", "svg")
                    .on("change", dropdownChangeAttribute);

    dropdownAttribute.selectAll("option")
      .data(myAttributes)
      .enter().append("option")
      .attr("value", function (d) { return d; })
      .text(function (d) {return d;});

      // create dropdown menu for domain data set
    let dropdownChangeDomain = function() {
        let newDomain = d3.select(this).property('value');
        currentDomain = newDomain;
        let newData   = domainMap[newDomain];
        svg.selectAll("*").remove();
        updateChart(newData, currentAttribute);// update chart
    };

    let myDomains = Object.keys(domainMap);

    let dropdownDomain = d3.select("#my-menu-domain")
                    .insert("select", "svg")
                    .on("change", dropdownChangeDomain);

    dropdownDomain.selectAll("option")
      .data(myDomains)
      .enter().append("option")
      .attr("value", function (d) { return d; })
      .text(function (d) {return d});

    currentDomain = "Eukaryota"; // initial Values for the Scatter plot
    currentAttribute = "Membrane";

    let initialData = domainMap[currentDomain];
    updateChart(initialData, currentAttribute);

}
window.onload = function() {
    myPlot = createDensityPlot(domainMap, attributeMap);
  };
