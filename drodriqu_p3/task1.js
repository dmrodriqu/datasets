function forceSimulation(node, link){
              return d3.forceSimulation(node)
                .force("link", d3.forceLink(link).id (d=>d.indexOf()))
                .force("charge", d3.forceManyBody())
                .force("center", d3.forceCenter())
          }
          
          var height = 768
          var width = 1024
          const url = "https://raw.githubusercontent.com/dmrodriqu/datasets/master/data.json"
          d3.queue()
            .defer(d3.json, url)
            .awaitAll(graphsa)
          
                
          function forceSimulation(nodes, links) {
                return d3.forceSimulation(nodes)
                .force("link", d3.forceLink(links))
                .force("charge", d3.forceManyBody().distanceMin(100).distanceMax(300))
                .force("center", d3.forceCenter());
          }
          function forceGraph(error, vertices, edges){
            if (error){
                throw error
            }
              var selection = '.task1force'
              var svg = d3.select(selection) 
                .append('svg')
                .attr("height", height)
                .attr("width", width)
                .attr("viewBox", [-width/2 , -height/2, width, height])
              
              
              function updategraph(ticked) {
                  const eInG = svg
                  .selectAll("line")
                  .data(edges) 
                  .enter()
                  .append("line")
                  .attr("stroke", "#4286f4")
                  .attr("stroke-opacity", function(d){return d.weight})

                  const vInG = svg
                  .selectAll("circle")
                  .data(vertices)
                  .enter()
                  .append("circle")
                  .attr("r", 4)
                  const simulation = forceSimulation(vertices, edges).on("tick", ticked);
                  return {eInG, vInG};
              }

              var ret = updategraph(ticked);
              const eInG = ret.eInG;
              const vInG = ret.vInG;
               
              function ticked(){
                  eInG
                  .attr("x1", d => d.source.x)
                  .attr("y1", d => d.source.y)
                  .attr("x2", d => d.target.x)
                  .attr("y2", d => d.target.y)

                 vInG
                  .attr("cy", d => d.y)
                  .attr("cx", d => d.x)
              }
          }
          function coordGraph(error, vertices, edges){
              if (error){
                  throw error
              }

              var selection = '.task1coord'
              var svg = d3.select(selection) 
                .append('svg')
                .attr("height", height)
                .attr("width", width)

              
              
              function udn() {
                  const eInG = svg
                  .selectAll("line")
                  .data(edges) 
                  .enter()
                  .append("line")
                  .attr("stroke", "#4286f4")
                  .attr("stroke-opacity", function(d){return d.weight})
                  .attr("x1", d => d.source.x*width)
                  .attr("y1", d => d.source.y*height)
                  .attr("x2", d => d.target.x*width)
                  .attr("y2", d => d.target.y*height)


                  const vInG = svg
                  .selectAll("circle")
                  .data(vertices)
                  .enter()
                  .append("circle")
                  .attr("r", 4)
                  .attr("cy", d => d.y*height)
                  .attr("cx", d => d.x*width)
                  return {eInG, vInG};
              }

              var ret = udn();
              const eInG = ret.eInG;
              const vInG = ret.vInG;
        
              }
          function graphsa(error, result){
              if (error){
                  throw error
              }
              const graph = result[0].graph
              var vertices = graph.nodes
              var edges = graph.links
              forceGraph(error, vertices, edges)
              coordGraph(error, vertices, edges)
          
              

        }