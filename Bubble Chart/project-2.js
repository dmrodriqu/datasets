// URL: https://beta.observablehq.com/@dmrodriqu/project-2
// Title: Project 2
// Author: Dylan Rodriquez (@dmrodriqu)
// Version: 4572
// Runtime version: 1

const m0 = {
  id: "6fd59518a28130af@4572",
  variables: [
    {
      inputs: ["md"],
      value: (function(md){return(
md`# Project 2`
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`## Task 1: Bubble Chart`
)})
    },
    {
      inputs: ["md","tex"],
      value: (function(md,tex){return(
md`For each of the variables to be represented, the table below summarizes the appropriate marks and channels.

| Variable                 | Marks          | Channels |
|--------------------------|----------------|----------|
| GDP Per Capita           | Point          | Position |
| Life expectancy at birth | Point          | Position |
| Population               | Spatial Region |          |
| Birth rate               |                | Color    |

Birth rate is defined as the number of births per 1000 persons per year; 
GDP per capita is defined as the GDP divided by the population of the respective country.

X and y axes are bound to logarithmic and linear scales, respectively.

min and max populations are a factor of 16,000 difference. Maintaining a ratio of this factor preserves the area invariant.

As the radii are proportional to area with respect to the square root of a constant factor of ${tex`\frac{1}{\pi}`}:

${tex`

r^2*\pi = A\\
r^2 = \frac{A}{\pi}\\
r = \sqrt{\frac{A}{\pi}}
`}

the square root of each value in the domain is mapped to the range of radii.
`
)})
    },
    {
      name: "viewof selection",
      inputs: ["d3","DOM","width","height","xaxis","yaxis","data"],
      value: (function(d3,DOM,width,height,xaxis,yaxis,data)
{
  const svg = d3.select(DOM.svg(width, height))
  // add the legend
 //A color scale
  //add the axis
  svg.append("g")
      .call(xaxis)
      .select(".domain").remove()
  svg.append("g")
      .call(yaxis) 
      .select(".domain").remove()
  
 const color = d3.scaleSequential(d3.interpolateBlues);
  
  const x = d3.scaleLinear()
      .domain(color.domain())
      .rangeRound([0, 260]);

  const legend = svg.append("g")
      .style("font-size", "0.8rem")
      .attr("transform", "translate(100,60)");

    
 

  
  const scale = legend.append("g")
  console.log(d3.extent(data.birthrate))
  scale.selectAll("rect")
    .data(d3.range(0,1, 0.01))
    .enter().append("rect")
      .attr("height", 10)
      .attr("x", d => x(d))
      .attr("width", (260 / 100) * 1.25)
      .attr("fill", d => color(d));

  const label = legend.append("text")
      .attr("y", -8)
      .attr("font-weight", "bold")
      .text("Birth Rate");
  
  scale.call(
    d3.axisBottom(x)
      .tickSize(15)
      .tickValues([0, 0.25 ,0.5, 0.75,1])
      .tickFormat(v => v*47)

    )
    .select(".domain")
      .remove();
  
  // add the graph group
   const dot = svg.append("g")
      .attr("fill", "none")
      .attr("stroke", "black")
      .attr("stroke-width", 1.0)
      .attr("opacity", 1)
    .selectAll("g")
    .data(data)
    .enter().append("circle")
      .attr("cx", function(d){return data.xscale(+d.gdp.slice(2, -1).replace(/,/g,""))})
      .attr("cy",function(d){return data.yscale(+d.life)})
      .attr("r", function(d){return data.rscale(+d.population)})
      .attr("fill", function(d){return data.color(+d.birthrate)})
      .attr("opacity", 0.8)
      
  return svg.node()
}
)
    },
    {
      name: "selection",
      inputs: ["Generators","viewof selection"],
      value: (G, _) => G.input(_)
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`
## Task 2
The plot below appears upon selection of variables.

### To view: 
select a dependent and independent variable then two additional variables to dictate the scaling of the radii and color scale.

The slider is mapped to a square root function, and displays the scaling as a factor of the area.

| Variable                 | Axis Function  | Radius Function | Color Scale Function |
|--------------------------|----------------|-----------------|----------------------|
| GDP Per Capita           | Log            |     Sqrt        |  Linear              |
| Life expectancy at birth | Linear         | Sqrt            |            Linear    |    
| Population               | Log            | Sqrt            |            Linear    |  
| Birth rate               | Linear         | Sqrt            |            Linear    |  
`

)})
    },
    {
      inputs: ["task2","graphvars"],
      value: (function(task2,graphvars){return(
task2(graphvars)
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`
## Use slider to scale area`
)})
    },
    {
      name: "sliderValue",
      inputs: ["Generators","slider"],
      value: (function(Generators,slider){return(
Generators.input(slider)
)})
    },
    {
      name: "slider",
      inputs: ["html","transform"],
      value: (function(html,transform)
{
  const form = html`<form>
  <div><input name=nonlinear type=range min=0 max=2 step=any> </div>
</form>`;
  const input = form.nonlinear
  input.value = transform.invert(form.value = 0.5);
  input.addEventListener("input", () => form.value = transform(input.valueAsNumber));
  return form;
}
)
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`
## Select Independent variable
`
)})
    },
    {
      name: "viewof independent",
      inputs: ["radiocols"],
      value: (function(radiocols){return(
radiocols()
)})
    },
    {
      name: "independent",
      inputs: ["Generators","viewof independent"],
      value: (G, _) => G.input(_)
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`
## Select Dependent variable`
)})
    },
    {
      name: "viewof dependent",
      inputs: ["radiocols"],
      value: (function(radiocols){return(
radiocols()
)})
    },
    {
      name: "dependent",
      inputs: ["Generators","viewof dependent"],
      value: (G, _) => G.input(_)
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`
## Select radius scaling`
)})
    },
    {
      name: "viewof radius",
      inputs: ["radiocols"],
      value: (function(radiocols){return(
radiocols()
)})
    },
    {
      name: "radius",
      inputs: ["Generators","viewof radius"],
      value: (G, _) => G.input(_)
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`
## Select fill variable`
)})
    },
    {
      name: "viewof fill",
      inputs: ["radiocols"],
      value: (function(radiocols){return(
radiocols()
)})
    },
    {
      name: "fill",
      inputs: ["Generators","viewof fill"],
      value: (G, _) => G.input(_)
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`## Task 3/4`
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md `## Task 3

The function t3 calls two axis functions iteratively: 

* callxscalemulti
* callyscalemulti

For the x axis function, an additional function call is made to "makexscalemulti"

Upon iterating a value for callxscalemulti, the height of the graph is divided by the appropriate amount, this iterator is passed to makexscalemulti to determine the translation of the x scale, effectively dividing the SVG by height, then column.

This approach is then taken by callyscalemulti.

marks and channels are added in the top of the heirarchy in the svg, with respect to the nested scaled x and y axes.

Values from the dropdown menus and scales are passed to the function generating the chart as a whole, with each mark generating function using the appropriate values in the array.

Brushing incomplete

## Task 4

Titles are appended to the marks, allowing for hoverover

Simultaneous viewing of hoverover in all four graphs is incomplete
`

)})
    },
    {
      name: "viewof t3",
      inputs: ["task3","independentgenerator","dependentgenerator"],
      value: (function(task3,independentgenerator,dependentgenerator){return(
task3(independentgenerator, dependentgenerator)
)})
    },
    {
      name: "t3",
      inputs: ["Generators","viewof t3"],
      value: (G, _) => G.input(_)
    },
    {
      name: "twoByTwoslections",
      inputs: ["html"],
      value: (function(html){return(
html`
<form>

<div class="row">
  <div class="col"></div>
  <div class="col">Graph 1</div>
  <div class="col">Graph 2</div>
  <div class="col">Graph 3</div>
  <div class="col">Graph 4</div>
</div>
<div class = "row">
  <div class = "column">
  <LABEL for="fname"> &nbsp&nbsp&nbspIndependent &nbsp&nbsp&nbsp</LABEL>
  </div>
  <div class = "column">
  <select name = g1i>
    <option>Per Capita GDP</option>
    <option>Life Expectancy at Birth</option>
    <option>Population</option>
    <option>Birthrate</option>
  </select>
 
  <select name = g2i>
    <option>Per Capita GDP</option>
    <option>Life Expectancy at Birth</option>
    <option>Population</option>
    <option>Birthrate</option>
  </select>
  <select name = g3i>
    <option>Per Capita GDP</option>
    <option>Life Expectancy at Birth</option>
    <option>Population</option>
    <option>Birthrate</option>
  </select>
  
  <select name = g4i>
    <option>Per Capita GDP</option>
    <option>Life Expectancy at Birth</option>
    <option>Population</option>
    <option>Birthrate</option>
  </select>
  </div>
</div>





<div class = "row">
  <div class = "column">
  <LABEL for="fname"> &nbsp&nbsp&nbsp Dependent &nbsp&nbsp&nbsp&nbsp&nbsp</LABEL>
  </div>
  <div class = "column">
  <select name = g1d>
    <option>Per Capita GDP</option>
    <option>Life Expectancy at Birth</option>
    <option>Population</option>
    <option>Birthrate</option>
  </select>
  
  <select name = g2d>
    <option>Per Capita GDP</option>
    <option>Life Expectancy at Birth</option>
    <option>Population</option>
    <option>Birthrate</option>
  </select>

  <select name = g3d>
    <option>Per Capita GDP</option>
    <option>Life Expectancy at Birth</option>
    <option>Population</option>
    <option>Birthrate</option>
  </select>
  
  <select name = g4d>
    <option>Per Capita GDP</option>
    <option>Life Expectancy at Birth</option>
    <option>Population</option>
    <option>Birthrate</option>
  </select>

  </div>



<div class = "row">
  <div class = "column">
    <LABEL for="fname"> &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp Area 
&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</LABEL>
  </div>
  <div class = "column">
  <select name = a1>
    <option>Per Capita GDP</option>
    <option>Life Expectancy at Birth</option>
    <option>Population</option>
    <option>Birthrate</option>
  </select>
 
  <select name = a2>
    <option>Per Capita GDP</option>
    <option>Life Expectancy at Birth</option>
    <option>Population</option>
    <option>Birthrate</option>
  </select>
  <select name = a3>
    <option>Per Capita GDP</option>
    <option>Life Expectancy at Birth</option>
    <option>Population</option>
    <option>Birthrate</option>
  </select>
  
  <select name = a4>
    <option>Per Capita GDP</option>
    <option>Life Expectancy at Birth</option>
    <option>Population</option>
    <option>Birthrate</option>
  </select>
  </div>
</div>

<div class = "row">
  <div class = "column">
    <LABEL for="fname"> &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp Color
&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</LABEL>
  </div>
  <div class = "column">
  <select name = c1>
    <option>Per Capita GDP</option>
    <option>Life Expectancy at Birth</option>
    <option>Population</option>
    <option>Birthrate</option>
  </select>
 
  <select name = c2>
    <option>Per Capita GDP</option>
    <option>Life Expectancy at Birth</option>
    <option>Population</option>
    <option>Birthrate</option>
  </select>
  <select name = c3>
    <option>Per Capita GDP</option>
    <option>Life Expectancy at Birth</option>
    <option>Population</option>
    <option>Birthrate</option>
  </select>
  
  <select name = c4>
    <option>Per Capita GDP</option>
    <option>Life Expectancy at Birth</option>
    <option>Population</option>
    <option>Birthrate</option>
  </select>
  </div>
</div>






</div>

<form>

   </form>`
)})
    },
    {
      name: "slidermulti",
      inputs: ["html"],
      value: (function(html)
{
  const form = html`
<form>
  <LABEL for="fname"> Radius Scaling </LABEL>
  <div><input name=nonlinear1 type=range min=0 max=1 value=0.5 step=any><i> Graph 1</i> </div>
  <div><input name=nonlinear2 type=range min=0 max=1 value=0.5 step=any><i> Graph 2</i> </div>
  <div><input name=nonlinear3 type=range min=0 max=1 value=0.5 step=any><i> Graph 3</i> </div>
  <div><input name=nonlinear4 type=range min=0 max=1 value=0.5 step=any><i> Graph 4</i></div>
</form>`;
  const input1 = form.nonlinear1
  const input2 = form.nonlinear2
  const input3 = form.nonlinear3
  const input4 = form.nonlinear4

  form.oninput = () => form.value = [
    form.nonlinear1.valueAsNumber, 
    form.nonlinear2.valueAsNumber, 
    form.nonlinear3.valueAsNumber, 
    form.nonlinear4.valueAsNumber, 
  ];
  form.oninput();
  return form;
}
)
    },
    {
      name: "scaling",
      inputs: ["graph1scale","graph2scale","graph3scale","graph4scale"],
      value: (function(graph1scale,graph2scale,graph3scale,graph4scale){return(
[graph1scale, graph2scale, graph3scale,graph4scale]
)})
    },
    {
      name: "graph1scale",
      inputs: ["Generators","slidermulti"],
      value: (function(Generators,slidermulti){return(
Generators.input(slidermulti[0])
)})
    },
    {
      name: "graph2scale",
      inputs: ["Generators","slidermulti"],
      value: (function(Generators,slidermulti){return(
Generators.input(slidermulti[1])
)})
    },
    {
      name: "graph3scale",
      inputs: ["Generators","slidermulti"],
      value: (function(Generators,slidermulti){return(
Generators.input(slidermulti[2])
)})
    },
    {
      name: "graph4scale",
      inputs: ["Generators","slidermulti"],
      value: (function(Generators,slidermulti){return(
Generators.input(slidermulti[3])
)})
    },
    {
      name: "task3",
      inputs: ["d3","DOM","width","height","strTranslate","callxscalemulti","callyscalemulti","addcircles","a1","c1","a2","c2","a3","c3","a4","c4"],
      value: (function(d3,DOM,width,height,strTranslate,callxscalemulti,callyscalemulti,addcircles,a1,c1,a2,c2,a3,c3,a4,c4){return(
function task3(generatorx, generatory){
  const svg = d3.select(DOM.svg(width, height+20))
   
  // add the legend
 //A color scale
  //add the axis


  
  for(var i = 1; i<=4; i++){
    var sttrans= strTranslate(generatorx[i-1])
    callxscalemulti(svg.append("g"), i, sttrans)

  }
  for(var i = 1; i<=4; i++){
    var sttrany= strTranslate(generatory[i-1])
    callyscalemulti(svg.append("g"), i, sttrany)
  }
  var t1 = addcircles(svg,strTranslate(generatorx[0]),
             strTranslate(generatory[0]),
             strTranslate(a1),
             strTranslate(c1)
             ,1)

  var t2 = addcircles(svg,strTranslate(generatorx[1]),
             strTranslate(generatory[1]),
             strTranslate(a2),
             strTranslate(c2),
             2)
  var t3 = addcircles(svg,strTranslate(generatorx[2]),
             strTranslate(generatory[2]),
             strTranslate(a3),
             strTranslate(c3),
             3)
  var t4 = addcircles(svg,strTranslate(generatorx[3]),
             strTranslate(generatory[3]),
             strTranslate(a4),
             strTranslate(c4),4)

  
  
  return svg.node()
}
)})
    },
    {
      name: "addcircles",
      inputs: ["Generators","data","makexscalemulti","selectparser","makeyscalemulti","makerscale","scaling","makecolorscale"],
      value: (function(Generators,data,makexscalemulti,selectparser,makeyscalemulti,makerscale,scaling,makecolorscale){return(
function addcircles(g,tranx, trany, rscale, col,i){

  function show(s){
    return Generators.input(s)
  }
   var div = g.append("div")
      .attr("class", "tooltip")
      .style("opacity", 0)
      .style("position", "absolute")
      .style("text-align", "center")
      .style("width", "60px")
      .style("height", "28px")
  
   g.append("g")
      .property("value", [])
      .attr("fill", "none")
      .attr("stroke", "black")
      .attr("stroke-width", 1.0)
      .attr("opacity", 1)
    .selectAll("g")
    .data(data)
    .enter()
      .append("circle")
      .attr("cx", function(d){
        return makexscalemulti(tranx,i)
       (selectparser(d,tranx))
       })
      .attr("cy", (function (d) {
        return makeyscalemulti(trany,i)
        (selectparser(d,trany))
      }))
      .attr("r", function(d){
        return makerscale(rscale)
        (selectparser(d,rscale))*scaling[i-1]
      })
      .attr("fill", function(d){
        return makecolorscale(col)(selectparser(d,col))
      })
      .attr("opacity", 0.8)
      .append("title")
      .text(d => `${d.country}\n${tranx}: ${d[tranx]}\n${trany}: ${d[trany]}`)



  

}
)})
    },
    {
      name: "strTranslate",
      value: (function(){return(
function strTranslate(instring){
  if(instring == "Population"){
    return "population"
  }else if(instring == "Per Capita GDP"){
    return "gdp"
  }else if(instring == "Life Expectancy at Birth"){
    return "life"
  }else if(instring == "Birthrate"){
    return "birthrate"
  }
}
)})
    },
    {
      name: "callyscalemulti",
      inputs: ["width","margin","d3","makeyscalemulti"],
      value: (function(width,margin,d3,makeyscalemulti){return(
function callyscalemulti(g,i, yvars){
  const unit = width/2
  if(i < 3){
    return g.attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(makeyscalemulti(yvars, i)).ticks(null, " "))
      .call(g => g.selectAll(".tick line").clone()
          .attr("x2", width)
          .attr("stroke-opacity", 0))

  }else if(i >= 3){
     return g.attr("transform", `translate(${margin.left+unit},0)`)
      .call(d3.axisLeft(makeyscalemulti(yvars, i)).ticks(null, " "))
      .call(g => g.selectAll(".tick line").clone()
          .attr("x2", width)
          .attr("stroke-opacity", 0))

  }
}
)})
    },
    {
      name: "yscalemulti",
      inputs: ["height","margin","d3"],
      value: (function(height,margin,d3){return(
function yscalemulti (dataval,i){
    const unit = height/2
    const bot = height-unit-margin.bottom 
    const top = height-(height/1)+margin.top
    var move = 1
    if (i>2){
      move = 3
    }else{
      move = 1
    }
    return d3.scaleLog().domain(d3.extent(dataval))
      .range([bot+((i-move)*unit), top+((i-move)*unit)])
}
)})
    },
    {
      name: "callxscalemulti",
      inputs: ["height","margin","d3","makexscalemulti"],
      value: (function(height,margin,d3,makexscalemulti){return(
function callxscalemulti(g,i,xvars){
    if(i <3){
      return g.attr("transform", `translate(0,${height/(3-i) - margin.bottom})`)
        .attr("opacity" , 1)
        .call(d3.axisBottom(makexscalemulti(xvars, i))
              .ticks(null, ""))

    }else if(i >= 3){
        return g.attr("transform", `translate(0,${height/(5-i) - margin.bottom})`)
          .attr("opacity" , 1)
          .call(d3.axisBottom(makexscalemulti(xvars, i))
            .ticks(null, "") )

    }
    /*
    for(var mid = 3; mid <= 5; mid +=2){
      return g.attr("transform", `translate(0,${height/(mid-i) - margin.bottom})`)
        .attr("opacity" , 1)
        .call(d3.axisBottom(makexscalemulti(xvars, i))
              .ticks(null, ""))
     */
}
)})
    },
    {
      name: "xscalemulti",
      inputs: ["d3","margin","width"],
      value: (function(d3,margin,width){return(
function xscalemulti (dataval, i){
  var scales = d3.scaleLog()
  if(i<3){
    scales.domain(d3.extent(dataval))
      .range([margin.left, width/2 - margin.right])
    return scales
  }else if(i>=3){
    scales.domain(d3.extent(dataval))
      .range([width/2 + margin.right, width-margin.right])
    return scales
  }
}
)})
    },
    {
      name: "makexscalemulti",
      inputs: ["xscalemulti","data"],
      value: (function(xscalemulti,data){return(
function makexscalemulti(compval,i){
  if(compval == "gdp"){
    return xscalemulti(data.gdp,i)
  }else if(compval == "life"){
    return xscalemulti(data.life,i)
  }else if(compval == "population"){
    return xscalemulti(data.pop,i)
  }else if(compval == "birthrate"){
    return xscalemulti(data.birthrate,i)
  }
}
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`### parsing functions`
)})
    },
    {
      name: "selectparser",
      inputs: ["parsegdp"],
      value: (function(parsegdp){return(
function selectparser(d, compval){
  if(compval=="gdp"){
    return parsegdp(d)
  }else if (compval== "life"){
    return +d.life
  }else if (compval == "population"){
    return +d.population
  }else if (compval == "birthrate"){
    return +d.birthrate
  }
}
)})
    },
    {
      name: "parsegdp",
      value: (function(){return(
function parsegdp(dat){
    return +dat.gdp.slice(2, -1).replace(/,/g,"")
}
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`### scaling and scale callback functions`
)})
    },
    {
      name: "g1d",
      inputs: ["Generators","twoByTwoslections"],
      value: (function(Generators,twoByTwoslections){return(
Generators.input(twoByTwoslections.g1d)
)})
    },
    {
      name: "g2d",
      inputs: ["Generators","twoByTwoslections"],
      value: (function(Generators,twoByTwoslections){return(
Generators.input(twoByTwoslections.g2d)
)})
    },
    {
      name: "g3d",
      inputs: ["Generators","twoByTwoslections"],
      value: (function(Generators,twoByTwoslections){return(
Generators.input(twoByTwoslections.g3d)
)})
    },
    {
      name: "g4d",
      inputs: ["Generators","twoByTwoslections"],
      value: (function(Generators,twoByTwoslections){return(
Generators.input(twoByTwoslections.g4d)
)})
    },
    {
      name: "g1i",
      inputs: ["Generators","twoByTwoslections"],
      value: (function(Generators,twoByTwoslections){return(
Generators.input(twoByTwoslections.g1i)
)})
    },
    {
      name: "g2i",
      inputs: ["Generators","twoByTwoslections"],
      value: (function(Generators,twoByTwoslections){return(
Generators.input(twoByTwoslections.g2i)
)})
    },
    {
      name: "g3i",
      inputs: ["Generators","twoByTwoslections"],
      value: (function(Generators,twoByTwoslections){return(
Generators.input(twoByTwoslections.g3i)
)})
    },
    {
      name: "g4i",
      inputs: ["Generators","twoByTwoslections"],
      value: (function(Generators,twoByTwoslections){return(
Generators.input(twoByTwoslections.g4i)
)})
    },
    {
      name: "a1",
      inputs: ["Generators","twoByTwoslections"],
      value: (function(Generators,twoByTwoslections){return(
Generators.input(twoByTwoslections.a1)
)})
    },
    {
      name: "a2",
      inputs: ["Generators","twoByTwoslections"],
      value: (function(Generators,twoByTwoslections){return(
Generators.input(twoByTwoslections.a2)
)})
    },
    {
      name: "a3",
      inputs: ["Generators","twoByTwoslections"],
      value: (function(Generators,twoByTwoslections){return(
Generators.input(twoByTwoslections.a3)
)})
    },
    {
      name: "a4",
      inputs: ["Generators","twoByTwoslections"],
      value: (function(Generators,twoByTwoslections){return(
Generators.input(twoByTwoslections.a4)
)})
    },
    {
      name: "c1",
      inputs: ["Generators","twoByTwoslections"],
      value: (function(Generators,twoByTwoslections){return(
Generators.input(twoByTwoslections.c1)
)})
    },
    {
      name: "c2",
      inputs: ["Generators","twoByTwoslections"],
      value: (function(Generators,twoByTwoslections){return(
Generators.input(twoByTwoslections.c2)
)})
    },
    {
      name: "c3",
      inputs: ["Generators","twoByTwoslections"],
      value: (function(Generators,twoByTwoslections){return(
Generators.input(twoByTwoslections.c3)
)})
    },
    {
      name: "c4",
      inputs: ["Generators","twoByTwoslections"],
      value: (function(Generators,twoByTwoslections){return(
Generators.input(twoByTwoslections.c4)
)})
    },
    {
      name: "dependentgenerator",
      inputs: ["g1d","g2d","g3d","g4d"],
      value: (function(g1d,g2d,g3d,g4d){return(
[g1d, g2d, g3d, g4d]
)})
    },
    {
      name: "independentgenerator",
      inputs: ["g1i","g2i","g3i","g4i"],
      value: (function(g1i,g2i,g3i,g4i){return(
[g1i, g2i, g3i, g4i]
)})
    },
    {
      name: "graphvars",
      inputs: ["independent","dependent","radius","fill"],
      value: (function(independent,dependent,radius,fill){return(
[independent,
             dependent,
             radius, 
             fill]
)})
    },
    {
      name: "makexscale",
      inputs: ["xscale","data","xlinscale"],
      value: (function(xscale,data,xlinscale){return(
function makexscale(compval){
  if(compval == "gdp"){
    return xscale(data.gdp)
  }else if(compval == "life"){
    return xlinscale(data.life)
  }else if(compval == "population"){
    return xscale(data.pop)
  }else if(compval == "birthrate"){
    return xlinscale(data.birthrate)
  }
}
)})
    },
    {
      name: "makerscale",
      inputs: ["rscale","data"],
      value: (function(rscale,data){return(
function makerscale(compval){
  if(compval == "gdp"){
    return rscale(data.gdp)
  }else if(compval == "life"){
    return rscale(data.life)
  }else if(compval == "population"){
    return rscale(data.pop)
  }else if(compval == "birthrate"){
    return rscale(data.birthrate)
  }
}
)})
    },
    {
      name: "makeyscale",
      inputs: ["ylogscale","data","yscale"],
      value: (function(ylogscale,data,yscale){return(
function makeyscale(compval){
  if(compval == "gdp"){
    return ylogscale(data.gdp)
  }else if(compval == "life"){
    return yscale(data.life)
  }else if(compval == "population"){
    return ylogscale(data.pop)
  }else if(compval == "birthrate"){
    return yscale(data.birthrate)
  }
}
)})
    },
    {
      name: "colorscale",
      inputs: ["d3"],
      value: (function(d3){return(
function colorscale(cval, linlog){
  if (linlog == "lin"){
    var scales = d3.scaleSequential(d3.interpolateBlues)
   }
   scales.domain(d3.extent(cval))  
  return scales
}
)})
    },
    {
      name: "makecolorscale",
      inputs: ["colorscale","data"],
      value: (function(colorscale,data){return(
function makecolorscale(compval){
  if(compval == "gdp"){
    return colorscale(data.gdp, "lin")
  }else if(compval == "life"){
    return colorscale(data.life, "lin")
  }else if(compval == "population"){
    return colorscale(data.pop, "lin")
  }else if(compval == "birthrate"){
    return colorscale(data.birthrate, "lin")
  }
}
)})
    },
    {
      name: "radiocols",
      inputs: ["d3","data","radio"],
      value: (function(d3,data,radio){return(
function radiocols(){
  var ar = [];
  const dataarr = d3.entries(data[0])
  dataarr.forEach(function (d) {ar.push(d.key)})
 return radio(ar)
}
)})
    },
    {
      name: "xscale",
      inputs: ["d3","margin","width"],
      value: (function(d3,margin,width){return(
function xscale (dataval){
  var scales = d3.scaleLog()
    .domain(d3.extent(dataval))
    .range([margin.left, width - margin.right])
  return scales
}
)})
    },
    {
      name: "xlinscale",
      inputs: ["d3","margin","width"],
      value: (function(d3,margin,width){return(
function xlinscale (dataval){
  var scales = d3.scaleLinear()
    .domain(d3.extent(dataval))
    .range([margin.left, width - margin.right])
  return scales
}
)})
    },
    {
      name: "yscale",
      inputs: ["d3","height","margin"],
      value: (function(d3,height,margin){return(
function yscale (dataval){
  var scales = d3.scaleLinear()
      .domain(d3.extent(dataval))
      .range([height - margin.bottom, margin.top])
  return scales
}
)})
    },
    {
      name: "ylogscale",
      inputs: ["d3","height","margin"],
      value: (function(d3,height,margin){return(
function ylogscale (dataval){
  var scales = d3.scaleLog()
      .domain(d3.extent(dataval))
      .range([height - margin.bottom, margin.top])
  return scales
}
)})
    },
    {
      name: "rscale",
      inputs: ["d3"],
      value: (function(d3){return(
function rscale (dataval){
  var scales = d3.scaleSqrt()
      .domain(d3.extent(dataval)).range([2,32])
  return scales
}
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`### data aquisition and formatting`
)})
    },
    {
      name: "stylesheet",
      inputs: ["html"],
      value: (function(html){return(
html`<link rel='stylesheet'
  href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" />`
)})
    },
    {
      from: "@jashkenas/inputs",
      name: "radio",
      remote: "radio"
    },
    {
      from: "@jashkenas/inputs",
      name: "select",
      remote: "select"
    },
    {
      name: "margin",
      value: (function(){return(
{top: 20, right: 20, bottom: 20, left: 20}
)})
    },
    {
      name: "height",
      value: (function(){return(
640
)})
    },
    {
      name: "data",
      inputs: ["d3","margin","width","height"],
      value: (async function(d3,margin,width,height)
{
  const facts = await d3.csv("https://raw.githubusercontent.com/dmrodriqu/datasets/master/factbook.csv");
  const dta = facts.map(({Country: country,
                Population: population, 
                ["Birth rate"]: birthrate,
                [" GDP per capita "]: gdp, 
                ["Life expectancy at birth"]: life}) => ({country, population, birthrate, gdp, life}));
  dta.gdp = dta.map(function(d){return +d.gdp.slice(2, -1).replace(/,/g,"")})
  dta.life = dta.map(function(d){return +d.life})
  dta.birthrate = dta.map(function(d){return +d.birthrate})
  dta.pop = dta.map(function(d){return +d.population})
  dta.country = dta.map(function(d){return d.country})
  dta.xscale =  d3.scaleLog()
      .domain(d3.extent(dta.gdp))
      .range([margin.left, width - margin.right])
  dta.yscale = d3.scaleLinear()
      .domain(d3.extent(dta.life))
      .range([height - margin.bottom, margin.top])
  dta.rscale = d3.scaleSqrt()
      .domain(d3.extent(dta.pop)).range([2,32])
  dta.color = d3.scaleSequential(d3.interpolateBlues)
      .domain(d3.extent(dta.birthrate))  

  return dta;
}
)
    },
    {
      name: "d3",
      inputs: ["require"],
      value: (function(require){return(
require("d3")
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`### axis functions`
)})
    },
    {
      name: "yaxis",
      inputs: ["margin","d3","data","width"],
      value: (function(margin,d3,data,width){return(
g => g
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(data.yscale).ticks(null, " "))
    .call(g => g.selectAll(".tick line").clone()
        .attr("x2", width)
        .attr("stroke-opacity", 0))
)})
    },
    {
      name: "xaxis",
      inputs: ["height","margin","d3","data"],
      value: (function(height,margin,d3,data){return(
g => g
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .attr("opacity" , 1)
    .call(d3.axisBottom(data.xscale)
          .ticks(null, "$") )
)})
    },
    {
      name: "callxscale",
      inputs: ["height","margin","d3","makexscale","graphvars"],
      value: (function(height,margin,d3,makexscale,graphvars){return(
g => g
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .attr("opacity" , 1)
    .call(d3.axisBottom(makexscale(graphvars[0]))
          .ticks(null, "") )
)})
    },
    {
      name: "makeyscalemulti",
      inputs: ["yscalemulti","data"],
      value: (function(yscalemulti,data){return(
function makeyscalemulti(compval, i){
  if(compval == "gdp"){
    return yscalemulti(data.gdp, i)
  }else if(compval == "life"){
    return yscalemulti(data.life, i)
  }else if(compval == "population"){
    return yscalemulti(data.pop, i)
  }else if(compval == "birthrate"){
    return yscalemulti(data.birthrate, i)
  }
}
)})
    },
    {
      name: "callyscale",
      inputs: ["margin","d3","makeyscale","graphvars","width"],
      value: (function(margin,d3,makeyscale,graphvars,width){return(
g => g
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(makeyscale(graphvars[1]))
          .ticks(null, " "))
    .call(g => g.selectAll(".tick line")
          .clone()
        .attr("x2", width)
        .attr("stroke-opacity", 0))
)})
    },
    {
      name: "transform",
      value: (function()
{
  const transform = x => x * x; // from nonlinear to linear
  transform.invert = x => Math.sqrt(x); // from linear to nonlinear
  return transform;
}
)
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`### main tasks`
)})
    },
    {
      name: "task2",
      inputs: ["d3","DOM","width","height","callxscale","callyscale","data","makexscale","selectparser","makeyscale","makerscale","sliderValue","makecolorscale"],
      value: (function(d3,DOM,width,height,callxscale,callyscale,data,makexscale,selectparser,makeyscale,makerscale,sliderValue,makecolorscale){return(
function task2(graphvars){
  const svg = d3.select(DOM.svg(width, height))
  // add the legend
 //A color scale
  //add the axis
  
  svg.append("g")
      .call(callxscale)
      .select(".domain").remove()
  
  svg.append("g")
      .call(callyscale) 
      .select(".domain").remove()
  
  // add the graph group
   const dot = svg.append("g")
      .attr("fill", "none")
      .attr("stroke", "black")
      .attr("stroke-width", 1.0)
      .attr("opacity", 1)
    .selectAll("g")
    .data(data)
    .enter().append("circle")
      .attr("cx", function(d){
        return makexscale(graphvars[0])
       (selectparser(d,graphvars[0]))
       })
      .attr("cy", (function (d) {
        return makeyscale(graphvars[1])
        (selectparser(d,graphvars[1]))
      }))
      .attr("r", function(d){
        return makerscale(graphvars[2])
        (selectparser(d,graphvars[2]))*sliderValue
      })
      .attr("fill", function(d){
        return makecolorscale((graphvars[3]))(selectparser(d,graphvars[3]))
      })
      .attr("opacity", 0.8)
  return svg.node()
}
)})
    }
  ]
};

const m1 = {
  id: "@jashkenas/inputs",
  variables: [
    {
      name: "radio",
      inputs: ["input","html"],
      value: (function(input,html){return(
function radio(config = {}) {
  let {value: formValue, title, description, submit, options} = config;
  if (Array.isArray(config)) options = config;
  options = options.map(o => typeof o === "string" ? {value: o, label: o} : o);
  const form = input({
    type: "radio", title, description, submit, 
    getValue: input => {
      const checked = Array.prototype.find.call(input, radio => radio.checked);
      return checked ? checked.value : undefined;
    }, 
    form: html`
      <form>
        ${options.map(({value, label}) => `
          <label style="display: inline-block; margin: 5px 10px 3px 0; font-size: 0.85em;">
           <input type=radio name=input value="${value}" ${value === formValue ? 'checked' : ''} style="vertical-align: baseline;" />
           ${label}
          </label>
        `)}
      </form>
    `
  });
  form.output.remove();
  return form;
}
)})
    },
    {
      name: "input",
      inputs: ["html","d3format"],
      value: (function(html,d3format){return(
function input(config) {
  let {form, type = "text", attributes = {}, action, getValue, title, description, format, submit, options} = config;
  if (!form) form = html`<form>
	<input name=input type=${type} />
  </form>`;
  const input = form.input;
  Object.keys(attributes).forEach(key => {
    const val = attributes[key];
    if (val != null) input.setAttribute(key, val);
  });
  if (submit) form.append(html`<input name=submit type=submit style="margin: 0 0.75em" value="${typeof submit == 'string' ? submit : 'Submit'}" />`);
  form.append(html`<output name=output style="font: 14px Menlo, Consolas, monospace; margin-left: 0.5em;"></output>`);
  if (title) form.prepend(html`<div style="font: 700 0.9rem sans-serif;">${title}</div>`);
  if (description) form.append(html`<div style="font-size: 0.85rem; font-style: italic;">${description}</div>`);
  if (format) format = d3format.format(format);
  if (action) {
    action(form);
  } else {
    const verb = submit ? "onsubmit" : type == "button" ? "onclick" : type == "checkbox" || type == "radio" ? "onchange" : "oninput";
    form[verb] = (e) => {
      e && e.preventDefault();
      const value = getValue ? getValue(input) : input.value;
      if (form.output) form.output.value = format ? format(value) : value;
      form.value = value;
      if (verb !== "oninput") form.dispatchEvent(new CustomEvent("input"));
    };
    if (verb !== "oninput") input.oninput = e => e && e.stopPropagation() && e.preventDefault();
    if (verb !== "onsubmit") form.onsubmit = (e) => e && e.preventDefault();
    form[verb]();
  }
  return form;
}
)})
    },
    {
      name: "d3format",
      inputs: ["require"],
      value: (function(require){return(
require("d3-format")
)})
    },
    {
      name: "select",
      inputs: ["input","html"],
      value: (function(input,html){return(
function select(config = {}) {
  let {
    value: formValue,
    title,
    description,
    submit,
    multiple,
    size,
    options
  } = config;
  if (Array.isArray(config)) options = config;
  options = options.map(
    o => (typeof o === "object" ? o : { value: o, label: o })
  );
  const form = input({
    type: "select",
    title,
    description,
    submit,
    getValue: input => {
      const selected = Array.prototype.filter
        .call(input.options, i => i.selected)
        .map(i => i.value);
      return multiple ? selected : selected[0];
    },
    form: html`
      <form>
        <select name="input" ${
          multiple ? `multiple size="${size || options.length}"` : ""
        }>
          ${options.map(
            ({ value, label }) => `
            <option value="${value}" ${
              value === formValue ? "selected" : ""
            }>${label}</option>
          `
          )}
        </select>
      </form>
    `
  });
  form.output.remove();
  return form;
}
)})
    },
    {
      name: "input",
      inputs: ["html","d3format"],
      value: (function(html,d3format){return(
function input(config) {
  let {form, type = "text", attributes = {}, action, getValue, title, description, format, submit, options} = config;
  if (!form) form = html`<form>
	<input name=input type=${type} />
  </form>`;
  const input = form.input;
  Object.keys(attributes).forEach(key => {
    const val = attributes[key];
    if (val != null) input.setAttribute(key, val);
  });
  if (submit) form.append(html`<input name=submit type=submit style="margin: 0 0.75em" value="${typeof submit == 'string' ? submit : 'Submit'}" />`);
  form.append(html`<output name=output style="font: 14px Menlo, Consolas, monospace; margin-left: 0.5em;"></output>`);
  if (title) form.prepend(html`<div style="font: 700 0.9rem sans-serif;">${title}</div>`);
  if (description) form.append(html`<div style="font-size: 0.85rem; font-style: italic;">${description}</div>`);
  if (format) format = d3format.format(format);
  if (action) {
    action(form);
  } else {
    const verb = submit ? "onsubmit" : type == "button" ? "onclick" : type == "checkbox" || type == "radio" ? "onchange" : "oninput";
    form[verb] = (e) => {
      e && e.preventDefault();
      const value = getValue ? getValue(input) : input.value;
      if (form.output) form.output.value = format ? format(value) : value;
      form.value = value;
      if (verb !== "oninput") form.dispatchEvent(new CustomEvent("input"));
    };
    if (verb !== "oninput") input.oninput = e => e && e.stopPropagation() && e.preventDefault();
    if (verb !== "onsubmit") form.onsubmit = (e) => e && e.preventDefault();
    form[verb]();
  }
  return form;
}
)})
    },
    {
      name: "d3format",
      inputs: ["require"],
      value: (function(require){return(
require("d3-format")
)})
    }
  ]
};

const notebook = {
  id: "6fd59518a28130af@4572",
  modules: [m0,m1]
};

export default notebook;
