margin_unique = {top: 20, right: 80, bottom: 100, left: 100},
    width = +d3.select("#root").style('width').replace("px", '') - margin_unique.left - margin_unique.right,
    height = 500 - margin_unique.top - margin_unique.bottom;

data = dark_proteins;

// Domain
(function () {
    // create data
    let data_layoutLength = d3.nest().key((d) => d._domain).key((d) => d._length).entries(data)
        .map(d => ({
            name: d.key,
            values: d.values.map(v => ({name: +v.key, value: v.values.length}))
        }));

    let data_layoutDisorder = d3.nest().key((d) => d._domain).key((d) => d._disorder).sortKeys(d3.ascending).entries(data)
        .map(d => ({
            name: d.key,
            values: d.values.map(v => ({name: +v.key, value: v.values.length}))
        }));

    let data_layoutDarkness = d3.nest().key((d) => d._domain).key((d) => d._darkness).sortKeys(d3.ascending).entries(data)
        .map(d => ({
            name: d.key,
            values: d.values.map(v => ({name: +v.key, value: v.values.length}))
        }));


    data_layoutLength.forEach(data => {
        data.values.sort((a, b) => a.name - b.name)
    });
    data_layoutDisorder.forEach(data => {
        data.values.sort((a, b) => a.name - b.name)
    });
    data_layoutDarkness.forEach(data => {
        data.values.sort((a, b) => a.name - b.name)
    });


    const draw1 = d3.select("#draw1");
    const draw2 = d3.select("#draw2");
    const draw3 = d3.select("#draw3");

    //color for lines
    const color = d3.scaleOrdinal().range(d3.schemeCategory10);
    color.domain(data_layoutLength.map(d => d.name));


    function draw(key, drawData, svg, xName, yName, keys) {
        svg.html("");
        let newDrawData = drawData.filter(d => keys.includes(d.name));
        const canvasG = svg.attr("width", width + margin_unique.left + margin_unique.right)
            .attr("height", height + margin_unique.top + margin_unique.bottom)
            .append("g")
            .attr("transform", "translate(" + margin_unique.left + "," + margin_unique.top + ")")
            .append("g");
        let x = d3.scaleLinear().range([0, width]);

        const y = d3.scaleLinear().range([height, 0]);

        const xAxis = d3.axisBottom().scale(x);

        const yAxis = d3.axisLeft().scale(y);

        const line = d3.line()
            .curve(d3.curveMonotoneX)
            .x(function (d) {
                return x(d.name);
            })
            .y(function (d) {
                return y(d.value);
            });

        x.domain(d3.extent(data.filter(d => keys.includes(d._domain)), function (d) {
            return d[key];
        }));

        y.domain([
            d3.min(newDrawData, function (c) {
                return d3.min(c.values, function (v) {
                    return v.value;
                });
            }),
            d3.max(newDrawData, function (c) {
                return d3.max(c.values, function (v) {
                    return v.value;
                });
            })
        ]);
        let k = 1;

        // zoom 
        const zoom = d3.zoom()
            .scaleExtent([1, 40])
            .on("zoom", () => {

                let transform = d3.event.transform;
                k = transform.k;
                canvasG.attr("transform", transform);

                gX.call(xAxis.scale(transform.rescaleX(x)));
                gY.call(yAxis.scale(transform.rescaleY(y)));

                drawLines();
            });

        var gX = svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(" + margin_unique.left + "," + (margin_unique.top + height) + ")")
            .attr("stroke", "white")
            .append('g')
            .call(xAxis);
        gX.append("text")
            .attr("x", width / 2)
            .attr("y", 40)
            .attr("dy", ".71em")
            .style("text-anchor", "middle")
            .style("font-size", "15px")
            .style("font-weight", "bold")
            .style("fill", "white")
            .text(xName);

        var gY = svg.append("g")
            .attr("transform", "translate(" + margin_unique.left + "," + margin_unique.top + ")")
            .attr("class", "y axis")
            .attr("stroke", "white")
            .append('g')
            .call(yAxis);
        gY.append("text")
            .attr("transform", "rotate(-90)")
            .attr('x', -height / 2)
            .attr("y", -70)
            .attr("dy", ".71em")
            .style("text-anchor", "middle")
            .style("font-size", "15px")
            .style("font-weight", "bold")
            .style("fill", "white")
            .text(yName);

        // draw lines
        let drawLines = () => {
            canvasG.html("");
            const city = canvasG.selectAll(".city")
                .data(newDrawData)
                .enter().append("g")
                .attr("class", "city");

            city.append("path")
                .attr("class", "line")
                .attr("d", function (d) {
                    return line(d.values);
                })
                .attr("data-legend", function (d) {
                    return d.name
                })
                .style('stroke-width', 1 / k + "px")
                .style("stroke", function (d) {
                    return color(d.name);
                });


            svg.call(zoom);
        };
        drawLines();
    }

    let keys = data_layoutLength.map(d => d.name);
    draw('_length', data_layoutLength, draw1, '_length', 'Number of Record', keys);
    draw('_disorder', data_layoutDisorder, draw2, '_disorder', 'Number of Record', keys);
    draw('_darkness', data_layoutDarkness, draw3, '_darkness', 'Number of Record', keys);


    keys = ['all', ...keys];
    let legengDiv = d3.select('#domainsLegend');
    keys.forEach(key => {
        let div = legengDiv.append('div').attr('data-legend', key).style("display", "inline-block").style('cursor', 'pointer')
            .on('click', function () {
                let key = d3.select(this).attr('data-legend');
                let otherKeys = keys.filter(k => k !== 'all');
                if (key !== 'all') {
                    otherKeys = [key];
                }
                draw('_length', data_layoutLength, draw1, '_length', 'Number of Record', otherKeys);
                draw('_disorder', data_layoutDisorder, draw2, '_disorder', 'Number of Record', otherKeys);
                draw('_darkness', data_layoutDarkness, draw3, '_darkness', 'Number of Record', otherKeys);
            });

        div.append('div')
            .attr('class', 'circle')
            .style('border', '5px solid' + color(key));
        div.append('span').html(key);

    })
}());

// Kingdom
(function () {
    // create data
    let data_layoutLength = d3.nest().key((d) => d._kingdom).key((d) => d._length).entries(data)
        .map(d => ({
            name: d.key,
            values: d.values.map(v => ({name: +v.key, value: v.values.length}))
        }));

    let data_layoutDisorder = d3.nest().key((d) => d._kingdom).key((d) => d._disorder).sortKeys(d3.ascending).entries(data)
        .map(d => ({
            name: d.key,
            values: d.values.map(v => ({name: +v.key, value: v.values.length}))
        }));

    let data_layoutDarkness = d3.nest().key((d) => d._kingdom).key((d) => d._darkness).sortKeys(d3.ascending).entries(data)
        .map(d => ({
            name: d.key,
            values: d.values.map(v => ({name: +v.key, value: v.values.length}))
        }));

    data_layoutLength.forEach(data => {
        data.values.sort((a, b) => a.name - b.name)
    });
    data_layoutDisorder.forEach(data => {
        data.values.sort((a, b) => a.name - b.name)
    });
    data_layoutDarkness.forEach(data => {
        data.values.sort((a, b) => a.name - b.name)
    });


    const draw1 = d3.select("#draw4");
    const draw2 = d3.select("#draw5");
    const draw3 = d3.select("#draw6");

    //corlor for lines
    const _color = (domain) => {
        let scale = d3.scaleBand()
            .domain(domain)
            .range([0, 1]);
        return (k) => {
            return d3.interpolateRainbow(scale(k));
        };
    };
    const color = _color(data_layoutLength.map(d => d.name));


    function draw(key, drawData, svg, xName, yName, keys) {
        svg.html("");
        let newDrawData = drawData.filter(d => keys.includes(d.name));
        const canvasG = svg.attr("width", width + margin_unique.left + margin_unique.right)
            .attr("height", height + margin_unique.top + margin_unique.bottom)
            .append("g")
            .attr("transform", "translate(" + margin_unique.left + "," + margin_unique.top + ")")
            .append("g");

        let x = d3.scaleLinear().range([0, width]);

        const y = d3.scaleLinear().range([height, 0]);

        const xAxis = d3.axisBottom()
            .scale(x);

        const yAxis = d3.axisLeft()
            .scale(y);

        const line = d3.line()
            .curve(d3.curveMonotoneX)
            .x(function (d) {
                return x(d.name);
            })
            .y(function (d) {
                return y(d.value);
            });

        x.domain(d3.extent(data.filter(d => keys.includes(d._kingdom)), function (d) {
            return d[key];
        }));

        y.domain([
            d3.min(newDrawData, function (c) {
                return d3.min(c.values, function (v) {
                    return v.value;
                });
            }),
            d3.max(newDrawData, function (c) {
                return d3.max(c.values, function (v) {
                    return v.value;
                });
            })
        ]);

        let k = 1;
        // zoom 
        const zoom = d3.zoom()
            .scaleExtent([1, 32])
            .on("zoom", () => {
                svg.select(".x.axis").call(xAxis.scale(d3.event.transform.rescaleX(x)));
                svg.select(".y.axis").call(yAxis.scale(d3.event.transform.rescaleY(y)));

                let transform = d3.event.transform;
                k = transform.k;
                canvasG.attr("transform", transform);
                drawLines();
            });

        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(" + margin_unique.left + "," + (margin_unique.top + height) + ")")
            .attr("stroke", "white")
            .call(xAxis)
            .append("text")
            .attr("x", width / 2)
            .attr("y", 40)
            .attr("dy", ".71em")
            .style("text-anchor", "middle")
            .style("font-size", "15px")
            .style("font-weight", "bold")
            .style("fill", "white")
            .text(xName);

        svg.append("g")
            .attr("transform", "translate(" + margin_unique.left + "," + margin_unique.top + ")")
            .attr("class", "y axis")
            .attr("stroke", "white")
            .call(yAxis)
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr('x', -height / 2)
            .attr("y", -70)
            .attr("dy", ".71em")
            .style("text-anchor", "middle")
            .style("font-size", "15px")
            .style("font-weight", "bold")
            .style("fill", "white")
            .text(yName);

        // draw lines
        let drawLines = () => {
            canvasG.html("");
            const city = canvasG.selectAll(".city")
                .data(newDrawData)
                .enter().append("g")
                .attr("class", "city");

            city.append("path")
                .attr("class", "line")
                .attr("d", function (d) {
                    return line(d.values);
                })
                .attr("data-legend", function (d) {
                    return d.name
                })
                .style('stroke-width', 1 / k + "px")
                .style("stroke", function (d) {
                    return color(d.name);
                });

            svg.call(zoom);
        };
        drawLines();
    }

    let keys = data_layoutLength.map(d => d.name);
    draw('_length', data_layoutLength, draw1, '_length', 'Number of Record', keys);
    draw('_disorder', data_layoutDisorder, draw2, '_disorder', 'Number of Record', keys);
    draw('_darkness', data_layoutDarkness, draw3, '_darkness', 'Number of Record', keys);

    keys = ['all', ...keys];
    let legengDiv = d3.select('#kingdomLegend');
    keys.forEach(key => {
        let div = legengDiv.append('div').attr('data-legend', key).style("display", "inline-block").style('cursor', 'pointer')
            .on('click', function () {
                let key = d3.select(this).attr('data-legend');
                let otherKeys = keys.filter(k => k !== 'all');
                if (key !== 'all') {
                    otherKeys = [key];
                }
                draw('_length', data_layoutLength, draw1, '_length', 'Number of Record', otherKeys);
                draw('_disorder', data_layoutDisorder, draw2, '_disorder', 'Number of Record', otherKeys);
                draw('_darkness', data_layoutDarkness, draw3, '_darkness', 'Number of Record', otherKeys);
            });

        div.append('div')
            .attr('class', 'circle')
            .style('border', '5px solid ' + color(key));
        div.append('span').html(key);

    })

}());

// Organism
(function () {
    let info = d3.select("#info");
    // create data
    let data_layoutLength = d3.nest().key((d) => d._organism_id).key((d) => d._length).entries(data)
        .map(d => ({
            name: d.key,
            values: d.values.map(v => ({name: +v.key, value: v.values.length}))
        }));
    //console.log(data_layoutLength);

    let data_layoutDisorder = d3.nest().key((d) => d._organism_id).key((d) => d._disorder).sortKeys(d3.ascending).entries(data)
        .map(d => ({
            name: d.key,
            values: d.values.map(v => ({name: +v.key, value: v.values.length}))
        }));
    //console.log(data_layoutDisorder);

    let data_layoutDarkness = d3.nest().key((d) => d._organism_id).key((d) => d._darkness).sortKeys(d3.ascending).entries(data)
        .map(d => ({
            name: d.key,
            values: d.values.map(v => ({name: +v.key, value: v.values.length}))
        }));
    //console.log(data_layoutDarkness);

    data_layoutLength.forEach(data => {
        data.values.sort((a, b) => a.name - b.name)
    });
    data_layoutDisorder.forEach(data => {
        data.values.sort((a, b) => a.name - b.name)
    });
    data_layoutDarkness.forEach(data => {
        data.values.sort((a, b) => a.name - b.name)
    });

    let x = d3.scaleLinear().range([0, width]);

    const y = d3.scaleLinear().range([height, 0]);

    const xAxis = d3.axisBottom()
        .scale(x);

    const yAxis = d3.axisLeft()
        .scale(y);

    const line = d3.line()
        .curve(d3.curveMonotoneX)
        .x(function (d) {
            return x(d.name);
        })
        .y(function (d) {
            return y(d.value);
        });

    const draw7 = d3.select("#draw7");
    const draw8 = d3.select("#draw8");
    const draw9 = d3.select("#draw9");

    const color = d3.scaleOrdinal().range(d3.schemeCategory10);
    color.domain(d3.keys(data[data_layoutLength]));


    draw('_length', data_layoutLength, draw7, '_length', 'Number of Record');

    function draw(key, drawData, svg, xName, yName) {
        const zoomG = svg.append("rect")
            .attr("width", width + margin_unique.left + margin_unique.right)
            .attr("height", height + margin_unique.top + margin_unique.bottom)
            .style("fill", "none")
            .style("pointer-events", "all");

        const canvasG = svg.attr("width", width + margin_unique.left + margin_unique.right)
            .attr("height", height + margin_unique.top + margin_unique.bottom)
            .append("g")
            .attr("transform", "translate(" + margin_unique.left + "," + margin_unique.top + ")")
            .append("g");


        x.domain(d3.extent(data, function (d) {
            return d[key];
        }));

        y.domain([
            d3.min(drawData, function (c) {
                return d3.min(c.values, function (v) {
                    return v.value;
                });
            }),
            d3.max(drawData, function (c) {
                return d3.max(c.values, function (v) {
                    return v.value;
                });
            })
        ]);

        let k = 1;
        // zoom 
        const zoom = d3.zoom()
            .scaleExtent([1, 32])
            .on("zoom", () => {
                svg.select(".x.axis").call(xAxis.scale(d3.event.transform.rescaleX(x)));
                svg.select(".y.axis").call(yAxis.scale(d3.event.transform.rescaleY(y)));

                let transform = d3.event.transform;
                k = transform.k;
                canvasG.attr("transform", transform);
                drawLines();
            });

        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(" + margin_unique.left + "," + (margin_unique.top + height) + ")")
            .attr("stroke", "white")
            .call(xAxis)
            .append("text")
            .attr("x", width / 2)
            .attr("y", 40)
            .attr("dy", ".71em")
            .style("text-anchor", "middle")
            .style("font-size", "15px")
            .style("font-weight", "bold")
            .style("fill", "white")
            .text(xName);

        svg.append("g")
            .attr("transform", "translate(" + margin_unique.left + "," + margin_unique.top + ")")
            .attr("class", "y axis")
            .attr("stroke", "white")
            .call(yAxis)
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr('x', -height / 2)
            .attr("y", -70)
            .attr("dy", ".71em")
            .style("text-anchor", "middle")
            .style("font-size", "15px")
            .style("font-weight", "bold")
            .style("fill", "white")
            .text(yName);

        // draw lines
        let drawLines = (() => {
            zoomG.call(zoom);
            let fn = () => {
                canvasG.html("");
                const city = canvasG.selectAll(".city")
                    .data(drawData)
                    .enter().append("g")
                    .attr("class", "city");

                city.append("path")
                    .attr("class", "line")
                    .attr("d", function (d) {
                        return line(d.values);
                    })
                    .attr("data-legend", function (d) {
                        return d.name
                    })
                    .style('stroke-width', 1 / k + "px")
                    .style("stroke", function (d) {
                        return color(d.name);
                    })
                    .on('click', function () {
                        let name = d3.select(this).attr("data-legend");
                        let coord = d3.mouse(document.body);
                        console.log('coord', coord);
                        info.style('left', (coord[0] + 10) + 'px')
                            .style('top', coord[1] + 'px')
                            .html("_organism_id ：" + name);
                    });
            };
            fn();
            return fn;
        })();
    }

    draw('_disorder', data_layoutDisorder, draw8, '_disorder', 'Number of Record');
    draw('_darkness', data_layoutDarkness, draw9, '_darkness', 'Number of Record');

})();
