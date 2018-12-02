var selection = '.task2'
const t3svg = d3.select(selection)
    .append('svg')
    .attr("height", height)
    .attr("width", width)
    .attr("fill", "none")
    .attr("stroke", "#000")

var importance = "https://raw.githubusercontent.com/dmrodriqu/datasets/master/importance.json"
var coordinates = "https://raw.githubusercontent.com/dmrodriqu/datasets/master/coordinates2.json"
var topo ="https://unpkg.com/us-atlas@1/us/10m.json"
var coordinates = "https://raw.githubusercontent.com/dmrodriqu/datasets/master/coordinates2.json"

var path = d3.geoPath()


d3.json(topo, function(error, us) {
  if (error) throw error;

  t3svg.append("path")
      .attr("stroke-width", 0.5)
      .attr("d", path(topojson.mesh(us, us.objects.states, function(a, b) { return a !== b; })));

  t3svg.append("path")
      .attr("d", path(topojson.feature(us, us.objects.nation)));

});


function filteredST(v,dat){
    var x = v.data[dat.source][10]
    var y = v.data[dat.source][11]
    var x2 = v.data[dat.target][10]
    var y2 = v.data[dat.target][11]
    var a = projection([y,x])
    var b = projection([y2,x2])
    if (a == null | b == null){
        return null
    }else{
        return dat
    }
}




function ticked(task, e, v){
          
          e
              .attr("x1", function(d){if(translation(d.source) != null){return translation(d.source)[0]}})
              .attr("y1", function(d){if(translation(d.source) != null){return translation(d.source)[1]}})
              .attr("x2", function(d){if(translation(d.target) != null){return translation(d.target)[0]}})
              .attr("y2", function(d){if(translation(d.target) != null){return translation(d.target)[1]}})

          v
              .attr('cx', function(d){if(translation(d) != null){return translation(d)[0]}})
              .attr('cy', function(d){if(translation(d) != null){return translation(d)[1]}})
              .attr('fill', "red")
              .attr('opacity', 1)
          if (task == 3){
              v
                  .on("mouseover", function(d) {
                    div.transition()
                        .duration(0)
                        .style("opacity", 1);
                    div.html(d[5] + "<br/>"+ d[6] + "<br/>"+ d[7] + "<br/>"+ "importance: " +d[4] + "<br/>")	
                       .style("left", (d3.event.pageX) + "px")
                       .style("top", (d3.event.pageY - 28) + "px");
                    })
                  .on("mouseout", function(d) {
                    div.transition()
                        .duration(0)		
                        .style("opacity", 0);
                        }
                     )
               e
                .on("mouseover", function(d) {
                    div.transition()
                        .duration(0)
                        .style("opacity", .9);
                    div.html(d.source[3] + "<br/>" + " and " + "<br/>" +d.target[3])	
                       .style("left", (d3.event.pageX) + "px")
                       .style("top", (d3.event.pageY - 28) + "px");
                    })
                  .on("mouseout", function(d) {
                    div.transition()
                        .duration(0)		
                        .style("opacity", 0);
                        }
                     )
               e
                }
}


function weightedusagraph(error, vertices, edges, sel, scaled){
              if (error){
                  throw error
              }
    
var squareScale = d3.scaleSqrt()
        .domain([0.003021148, 0.419939577])
        .range([0,16]);
    
var scaleLin = d3.scaleLinear()
        .domain([1, 77])
        .range(["white","blue"]);
    
var widthscale = d3.scaleLinear()
        .domain([1, 77])
        .range([0,3]);
    
var opacityScale =  d3.scaleLinear()
        .domain([1, 77])
        .range([.7,.9]);
    
    
    var eInG = sel
        .append('g')
        .selectAll("line")
        .data(edges.filter(function(d){return filteredST(vertices, d) != null; }))
        .enter()
        .append("line")
        .attr("stroke", function(d){if (scaled){
            return scaleLin(d.connections)}else{return "blue"}})
        .attr("opacity", function(d){if (scaled){
            return opacityScale(d.connections)}else{return 0.1}
                                     })
        .attr("stroke-width", function(d){if (scaled){
            return widthscale(d.connections)}})
    
     var vInG = sel
        .append('g')
        .selectAll("circle")
        .data(vertices.data.filter(function(d) {return translation(d) != null; }))
        .enter()
        .append("circle")
        .attr('r', function(d) {if (scaled){
            return squareScale(d[4])
            }else{
                return 4
            }
        })
     
     if(sel = t3svg){
         const simlink = forcelink(vertices, edges).on("tick", ticked(3, eInG, vInG));
         
     }if(sel = t4svg){
         const simlink = forcelink(vertices, edges).on("tick", ticked(4, eInG, vInG));
         
         function updatescale(val){
            sel.selectAll("circle")
                .data(vertices.data.filter(function(d) {return d[4] > val; }))
                .remove()

         }
         var slider = d3.sliderHorizontal()
         .min(30)
         .max(50)
         .width(300)
         .displayValue(false)
         .on('onchange', val => {updatescale(val)})
         
         d3.select("#slider").append("svg")
             .attr("width", 500)
             .attr("height", 100)
             .append("g")
             .attr("transform", "translate(30,30)")
             .call(slider);

         

         
     }
      
      
      return {eInG, vInG};
         
}



