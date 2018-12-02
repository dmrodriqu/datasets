var height = 800
var width = 960;
var selection = '.task4'
const t4svg = d3.select(selection)
    .append('svg')
    .attr("height", height)
    .attr("width", width)
    .attr("fill", "none")
    .attr("stroke", "#000")




d3.queue()
    .defer(d3.json, coordinates)
    .awaitAll(graphs4)
d3.json(topo, function(error, us) {
  if (error) throw error;

  t4svg.append("path")
      .attr("stroke-width", 0.5)
      .attr("d", path(topojson.mesh(us, us.objects.states, function(a, b) { return a !== b; })));

  t4svg.append("path")
      .attr("d", path(topojson.feature(us, us.objects.nation)));

});


function edgelegend() {
    var linear = d3.scaleLinear()
        .domain([1,77])
        .range(["rgb(255,255,255)", "rgb(0,0,255)"]);

    t4svg.append("g")
        .attr("class", "legendLinear")
        .attr("transform", "translate(550,700)");

    var legendLinear = d3.legendColor()
        .shapeWidth(50)
        .title("Edge Frequency")
        .orient('horizontal')
        .scale(linear);

    t4svg.select(".legendLinear")
        .call(legendLinear);
}




function vertexledgend() {
    var sqscale = d3.scaleSqrt()
        .domain([0.003021148, 0.419939577])
        .range([0, 16]);
    t4svg.append("g")
        .attr("class", "legendSize")
        .attr("transform", "translate(200, 700)");
    var legendSize = d3.legendSize()
        .scale(sqscale)
        .title("Importance")
        .shape('circle')
        .shapePadding(30)
        .labelOffset(20)
        .orient('horizontal');

    t4svg.select(".legendSize")
        .call(legendSize);
}




var div = d3.select("body").append("div")	
    .attr("class", "tooltip")				
    .style("opacity", 0);


function graphs4(error, result){
              if (error){
                  throw error
              }
    d3.json(edg, function(error, connections){
        if(error) {
            throw error
        }
        var nodes = result[0]
        var st = "https://raw.githubusercontent.com/dmrodriqu/datasets/master/sourcetarget.json"
        d3.json(st, function(error, sourcetargets){
            if(error) {
                throw error
            }
            console.log(nodes)
            console.log(d3.extent(nodes.data.map(function(child) { return child[4]})))
            console.log(d3.extent(sourcetargets.map(function(d) {return d.connections})))
            weightedusagraph(error, nodes, sourcetargets, t4svg, true)
            weightedusagraph(error, nodes, connections.graph.links, t3svg, false)
            vertexledgend();
            edgelegend();

            
        }
    )
})}







        