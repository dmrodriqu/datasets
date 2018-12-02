



var edg = "https://raw.githubusercontent.com/dmrodriqu/datasets/master/data.json"





const projection = d3.geoAlbersUsa()
      .scale(1280)
      .translate([480, 300])


function forcelink(nodes, links) {
      return d3.forceSimulation(nodes.data)
      .force("link", d3.forceLink(links))
      .force("charge", d3.forceManyBody())
      .force("center", d3.forceCenter(width / 2, height / 2));
}

function translation(data) {

        if (projection([data[11],data[10]]) != null){
            return projection([data[11],data[10]])
        }if(projection([data[11],data[10]]) < [0,0]){
            return null
        }
}

