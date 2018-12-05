// URL: https://beta.observablehq.com/@dmrodriqu/opioid-epidemic-in-perspective
// Title: Opioid Epidemic: In perspective
// Author: Dylan Rodriquez (@dmrodriqu)
// Version: 1438
// Runtime version: 1

const m0 = {
  id: "dd5f81f9e660ab37@1438",
  variables: [
    {
      inputs: ["md"],
      value: (function(md){return(
md`# Opioid Epidemic: In perspective`
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`## Incidence per 100,000:
Each 100 pixel unit circle represents 100 individuals. A total of 1000 circles represent an age adjusted rate with red circles representing deaths per 100,000 individuals`
)})
    },
    {
      name: "Chrysanthemum",
      inputs: ["selection","createSimulation","d3","DOM"],
      value: (function(selection,createSimulation,d3,DOM)
{
  const w = 1024
  const h = 768
  
  var nationalnodes = selection()
  // create simulation
  const sim = createSimulation(nationalnodes, h, w).on('tick', ticked)
  // append SVG to the DOM
  const svg = d3.select(DOM.svg(w, h))
      .attr("viewBox", [-w / 2, -h / 2, w, h]);

  // bind nodes as circles to the SVG
  var node = svg.append('g')
    .selectAll('circle')
    .data(nationalnodes)
    .enter()
    .append('circle')
    .attr('r', d=>d.radius)
    .attr('fill', function(d){
      if(d.dth == true){
        return 'red'}
      else{
        return 'black'}
    })
    
  // tick function
  function ticked(){
     node
        .attr('cx', d=> d.x)
        .attr('cy', d=> d.y)
    }
  return svg.node();
}
)
    },
    {
      inputs: ["md","updatetext","state"],
      value: (function(md,updatetext,state){return(
md`Select a state below to see how the age adjusted rate changes.
The age adjusted death rate for opioid related deaths is ${updatetext} per 100,000 in ${state} `
)})
    },
    {
      name: "viewof SelectedState",
      inputs: ["select","states"],
      value: (function(select,states){return(
select(states)
)})
    },
    {
      name: "SelectedState",
      inputs: ["Generators","viewof SelectedState"],
      value: (G, _) => G.input(_)
    },
    {
      name: "nationalChrysanthemum",
      inputs: ["mortselection","createSimulation","d3","DOM"],
      value: (function(mortselection,createSimulation,d3,DOM)
{
  const w = 1024
  const h = 768
  
  var nationalnodes = mortselection()
  // create simulation
  const sim = createSimulation(nationalnodes, h, w).on('tick', ticked)
  // append SVG to the DOM
  const svg = d3.select(DOM.svg(w, h))
      .attr("viewBox", [-w / 2, -h / 2, w, h]);

  // bind nodes as circles to the SVG
  var node = svg.append('g')
    .selectAll('circle')
    .data(nationalnodes)
    .enter()
    .append('circle')
    .attr('r', d=>d.radius)
    .attr('fill', function(d){
      if(d.dth == true){
        return 'red'}
      else{
        return 'black'}
    })
    
  // tick function
  function ticked(){
     node
        .attr('cx', d=> d.x)
        .attr('cy', d=> d.y)
    }
  return svg.node();
}
)
    },
    {
      inputs: ["md","SelectedMortalityCause","updatemortval"],
      value: (function(md,SelectedMortalityCause,updatemortval){return(
md`Additional age adjusted rates of mortality are selectable in the dropdown menu below for comparison. The national age adjusted mortality rate for ${SelectedMortalityCause} is ${updatemortval} per 100,000`
)})
    },
    {
      name: "viewof SelectedMortalityCause",
      inputs: ["select","mortalitycauses"],
      value: (function(select,mortalitycauses){return(
select(mortalitycauses)
)})
    },
    {
      name: "SelectedMortalityCause",
      inputs: ["Generators","viewof SelectedMortalityCause"],
      value: (G, _) => G.input(_)
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`## log ratio of age adjusted rate of overdose to prescription rate

Each county was normalized by prescription rate. On average, serious adverse events should be similar across providers. The diverging color scale expresses differnces between counties as standard deviations from the mean age adjusted death rate per prescription rate.`

)})
    },
    {
      inputs: ["choropleth","category"],
      value: (function(choropleth,category){return(
choropleth(category)
)})
    },
    {
      name: "initial brushedSelection",
      value: (function(){return(
[]
)})
    },
    {
      name: "mutable brushedSelection",
      inputs: ["Mutable","initial brushedSelection"],
      value: (M, _) => new M(_)
    },
    {
      name: "brushedSelection",
      inputs: ["mutable brushedSelection"],
      value: _ => _.generator
    },
    {
      name: "choropleth",
      inputs: ["mapto","op","d3","iqr","topojson","us","DOM","format","mutable brushedSelection"],
      value: (function(mapto,op,d3,iqr,topojson,us,DOM,format,$0){return(
function choropleth(cat){
  var dattomap =  mapto(op, cat)
  const width = 960;
  const height = 600;
  const path = d3.geoPath();
  var dom = iqr(Array.from(dattomap.values()))
  var x = dom[1]
  dom[1] = dom[0]
  dom[0] = x
  var color = d3.scaleSequential(d3.interpolateRdBu).
    domain(dom)
  let counties = topojson.feature(us, us.objects.counties).features
  const svg = d3.select(DOM.svg(width, height))
      .style("width", "100%")
      .style("height", "auto");

  const g = svg.append("g")
      .attr("transform", "translate(0,40)");

  svg.append("g")
    .selectAll("path")
    .data(topojson.feature(us, us.objects.counties).features)
    .enter().append("path")
      .attr("fill", d => color(dattomap.get(+d.id)))
      .attr("d", path)
    .append("title")
      .text(d => format(dattomap.get(+d.id)));

  svg.append("path")
      .datum(topojson.mesh(us, us.objects.states, (a, b) => a !== b))
      .attr("fill", "none")
      .attr("stroke", "white")
      .attr("stroke-linejoin", "round")
      .attr("d", path);

  svg.append("g")
    .attr("class", "brush")
    .call(d3.brush().on("brush", brushed))
  
  function brushed(){
    $0.value = []
    var s = []
    if (d3.event.selection){
      const [[x1, y1], [x2, y2]]= d3.event.selection
      counties.filter(function(d){
         d.geometry.coordinates[0].filter(function(coord){
          if ((coord[0]> x1 & coord[0] < x2) & (coord[1] > y1 & coord[1] < y2)){
            s.push(d.id)}
        })
      })
    }
    $0.value = Array.from(new Set(s))
      }
  

  return svg.node();
}
)})
    },
    {
      name: "viewof c",
      inputs: ["createHistogramBins","op"],
      value: (function(createHistogramBins,op){return(
createHistogramBins(op)
)})
    },
    {
      name: "c",
      inputs: ["Generators","viewof c"],
      value: (G, _) => G.input(_)
    },
    {
      name: "viewof category",
      inputs: ["select","opioids"],
      value: (function(select,opioids){return(
select(Object.keys(opioids[0]).slice(4,) )
)})
    },
    {
      name: "category",
      inputs: ["Generators","viewof category"],
      value: (G, _) => G.input(_)
    },
    {
      name: "viewof Yr",
      inputs: ["slider"],
      value: (function(slider){return(
slider({
  min: 1999,
  max: 2016,
  step: 1,
  value: 2010,
  format: ",",
  description:
    "Slide to See the Progression of Time"
})
)})
    },
    {
      name: "Yr",
      inputs: ["Generators","viewof Yr"],
      value: (G, _) => G.input(_)
    },
    {
      name: "createHistogramBins",
      inputs: ["brushedSelection","category","d3","margin","width","DOM"],
      value: (function(brushedSelection,category,d3,margin,width,DOM){return(
function createHistogramBins(dat){
 var filt = []
 if (brushedSelection != []){
   for(var i in brushedSelection){
      for(var f in dat){
        if(+dat[f].FIPS === +brushedSelection[i]){
          filt.push(dat[f])
        }
      }
   }
   
   var opbin = filt.map(a => +a[category])}
  else{
   var opbin = dat.map(a => +a[category])
 }
 var height = 768
 var x = d3.scaleLinear()
    .domain(d3.extent(opbin)).nice()
    .range([margin.left, width - margin.right])
 
 var hist = d3.histogram()
    .domain(x.domain())
    .thresholds(x.ticks(40))
    (opbin)
 
 var y = d3.scaleLinear()
    .domain([0, d3.max(hist, d => d.length)]).nice()
    .range([height - margin.bottom, margin.top])
 
 var xAxis = g => g
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(x).tickSizeOuter(0))
    .call(g => g.append("text")
        .attr("x", width - margin.right)
        .attr("y", -4)
        .attr("fill", "#000")
        .attr("font-weight", "bold")
        .attr("text-anchor", "end")
        .text(opbin.x))
 
 var yAxis = g => g
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y))
    .call(g => g.select(".domain").remove())
    .call(g => g.select(".tick:last-of-type text").clone()
        .attr("x", 4)
        .attr("text-anchor", "start")
        .attr("font-weight", "bold")
        .text(opbin.y))
 
 
  const svg = d3.select(DOM.svg(width, height));
  
  const bar = svg.append("g")
      .attr("fill", "steelblue")
    .selectAll("rect")
    .data(hist)
    .enter().append("rect")
      .attr("x", d => x(d.x0) + 1)
      .attr("width", d => Math.max(0, x(d.x1) - x(d.x0) - 1))
      .attr("y", d => y(d.length))
      .attr("height", d => y(0) - y(d.length));

  svg.append("g")
      .call(xAxis);
  
  svg.append("g")
      .call(yAxis);
  
  return svg.node();
 
 return hist
}
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`## data`
)})
    },
    {
      name: "getData",
      inputs: ["d3"],
      value: (function(d3){return(
function getData(file){
      var dat = d3.csv(file, function(data){
        return{
          State: data['State Name'],
          County: data['County Name'],
          Deaths: data['deathmax']
        }
      })
      return dat
}
)})
    },
    {
      name: "getMedicare",
      inputs: ["d3"],
      value: (function(d3){return(
function getMedicare(){
      var dat = d3.csv('https://raw.githubusercontent.com/dmrodriqu/datasets/master/opiateprescriptiondeathsyr.csv', function(data){
        //if (+data.Year == Yr){
          return{
            Year: data['Year'],
            FIPS: data['FIPS'],
            State: data['State Name'],
            County: data['County Name'],
            Deaths: data['zdeathup'],
            Change: data['Change in Opioid Prescribing Rate'],
            ExtendedClaimsNormed: data['Extended Release Opioid Claims normed'],
            Claims: data['Opioid Claims'],
            ClaimsNormed: data['Opioid Claims normed'],
            PrescribersNormed: data['Part D Opioid Prescribers normed'],
            AgeRate: data['deathmax']
            }
        //}
      })
      return dat
}
)})
    },
    {
      name: "grouping",
      inputs: ["d3","data"],
      value: (function(d3,data){return(
d3.nest()
                     .key(function(d){return d.State})
                     .rollup(function(v){return d3.mean(v,function (d){return d.Deaths})})
                     .entries(data)
)})
    },
    {
      name: "data",
      inputs: ["getData"],
      value: (function(getData){return(
getData('https://raw.githubusercontent.com/dmrodriqu/datasets/master/opiatedata.csv')
)})
    },
    {
      name: "nationalnodes",
      inputs: ["nodemaker"],
      value: (function(nodemaker){return(
nodemaker(1000, 0.198, 10/(3.1415)**(1/2))
)})
    },
    {
      name: "opioids",
      inputs: ["getMedicare"],
      value: (function(getMedicare){return(
getMedicare()
)})
    },
    {
      name: "filteredYear",
      inputs: ["opioids","Yr"],
      value: (function(opioids,Yr){return(
function filteredYear(){
  var op =  opioids.filter(function(d) {return +d.Year == Yr});
  return op
}
)})
    },
    {
      name: "op",
      inputs: ["filteredYear"],
      value: (function(filteredYear){return(
filteredYear()
)})
    },
    {
      name: "countystd",
      inputs: ["opioids"],
      value: (async function(opioids)
{
  let data = new Map((await opioids).map(d => [+d.FIPS, +d.Deaths]));
  data.title = "opioidcounty";
  return data;
}
)
    },
    {
      name: "countychange",
      inputs: ["mapto","opioids"],
      value: (function(mapto,opioids){return(
mapto(opioids, "Change")
)})
    },
    {
      name: "mapto",
      value: (function(){return(
function mapto(datatomap, val){
  let data = new Map((datatomap).map(d => [+d.FIPS, +d[val]]));
  data.title = "opioidcounty";
  return data;
}
)})
    },
    {
      name: "m",
      inputs: ["createdict","mortalitycauses","mortalityrates"],
      value: (function(createdict,mortalitycauses,mortalityrates){return(
createdict(mortalitycauses, mortalityrates)
)})
    },
    {
      name: "mortalityrates",
      value: (function(){return(
[728.8, 165.5,155.8,47.4,40.6, 37.3,30.3,21.0,13.5,13.1,13.5,10.7,10.7,8.6,8.0,5.2,169.1]
)})
    },
    {
      name: "mortalitycauses",
      value: (function(){return(
['All Causes', 'Diseases of heart',
                        'Malignant neoplasms',
                        'Accidents (unintentional injuries)',
                        'Chronic lower respiratory diseases',
                        'Cerebrovascular diseases',
                        'Alzheimer’s disease',
                        'Diabetes mellitus',
                        'Influenza and pneumonia',
                        'Nephritis, nephrotic syndrome and nephrosis',
                        'Intentional self-harm (suicide)',
                        'Septicemia',
                        'Chronic liver disease and cirrhosis',
                        'Essential hypertension and hypertensive renal disease',
                        'Parkinson’s disease',
                        'Pneumonitis due to solids and liquids',
                        'All other causes']
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`## Topology`
)})
    },
    {
      name: "scale",
      inputs: ["d3"],
      value: (function(d3){return(
d3.scaleDiverging(d3.interpolateSpectral)
)})
    },
    {
      name: "us",
      inputs: ["d3"],
      value: (function(d3){return(
d3.json("https://unpkg.com/us-atlas@1/us/10m.json")
)})
    },
    {
      name: "topojson",
      inputs: ["require"],
      value: (function(require){return(
require("topojson-client@3")
)})
    },
    {
      name: "statelist",
      inputs: ["data"],
      value: (function(data){return(
function statelist(){
  var states = []
  for(var i in data){
    var cstate = data[i]["State"]
    if(states.includes(cstate)){
      continue
    }else{
      states.push(cstate)
     }
   }
  return states
}
)})
    },
    {
      name: "states",
      inputs: ["statelist"],
      value: (function(statelist){return(
statelist()
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md `## Imports `
)})
    },
    {
      name: "d3",
      inputs: ["require"],
      value: (function(require){return(
require('d3@5')
)})
    },
    {
      from: "@jashkenas/inputs",
      name: "slider",
      remote: "slider"
    },
    {
      from: "@jashkenas/inputs",
      name: "select",
      remote: "select"
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`## chrysanthemum`
)})
    },
    {
      name: "initial state",
      value: (function(){return(
'none'
)})
    },
    {
      name: "mutable state",
      inputs: ["Mutable","initial state"],
      value: (M, _) => new M(_)
    },
    {
      name: "state",
      inputs: ["mutable state"],
      value: _ => _.generator
    },
    {
      name: "initial updatetext",
      value: (function(){return(
'none'
)})
    },
    {
      name: "mutable updatetext",
      inputs: ["Mutable","initial updatetext"],
      value: (M, _) => new M(_)
    },
    {
      name: "updatetext",
      inputs: ["mutable updatetext"],
      value: _ => _.generator
    },
    {
      name: "initial updatemortcause",
      value: (function(){return(
"none"
)})
    },
    {
      name: "mutable updatemortcause",
      inputs: ["Mutable","initial updatemortcause"],
      value: (M, _) => new M(_)
    },
    {
      name: "updatemortcause",
      inputs: ["mutable updatemortcause"],
      value: _ => _.generator
    },
    {
      name: "initial updatemortval",
      value: (function(){return(
"none"
)})
    },
    {
      name: "mutable updatemortval",
      inputs: ["Mutable","initial updatemortval"],
      value: (M, _) => new M(_)
    },
    {
      name: "updatemortval",
      inputs: ["mutable updatemortval"],
      value: _ => _.generator
    },
    {
      name: "mortselection",
      inputs: ["SelectedMortalityCause","m","mutable updatemortcause","mutable updatemortval","nodemaker"],
      value: (function(SelectedMortalityCause,m,$0,$1,nodemaker){return(
function mortselection(){
  if(SelectedMortalityCause != "undefined"){
      var selstate = m.filter(obj=>{return obj.key == SelectedMortalityCause})
      var deathInSelState = selstate[0].value
      $0.value = selstate[0].key
      $1.value = deathInSelState.toFixed(3)
      // 100 pixels per circle
      var nationalnodes = nodemaker(1000, deathInSelState/100, 10/(3.1415)**(1/2))
      return nationalnodes
  }else{
    $1.value = 728.8
    $0.value = "All Causes"
    return nodemaker(1000, 7.288, 10/(Math.pi)**(1/2))
  }
}
)})
    },
    {
      name: "selection",
      inputs: ["SelectedState","grouping","mutable state","mutable updatetext","nodemaker"],
      value: (function(SelectedState,grouping,$0,$1,nodemaker){return(
function selection(){
    if (SelectedState != "undefined"){
      var selstate = grouping.filter(obj=>{return obj.key == SelectedState})
      var deathInSelState = selstate[0].value
      $0.value = selstate[0].key
      $1.value = deathInSelState.toFixed(3)
      // 100 pixels per circle
      var nationalnodes = nodemaker(1000, deathInSelState/100, 10/(3.1415)**(1/2))
      return nationalnodes
    }else{
     return  nodemaker(1000, 0.198, 5)}
}
)})
    },
    {
      name: "createSimulation",
      inputs: ["d3"],
      value: (function(d3){return(
function createSimulation(whichnodes, h, w){
      var simulation = d3.forceSimulation(whichnodes)
        .force('charge', d3.forceManyBody().strength(function(d){
          if(d.dth == true){return -0.1}else{return -.2}}))
        .force('center', d3.forceCenter(w/16, h/32))
        .force('collision', d3.forceCollide().radius(function(d) {
          return d.radius
          }))
      return simulation
    }
)})
    },
    {
      name: "nodemaker",
      inputs: ["d3"],
      value: (function(d3){return(
function nodemaker(numberOfNodes, calcdeath, radius){
    var deathradii = d3.
      scaleSqrt()
      .domain([0, 1])
      .range([0, 5])
    var nodes  = d3.range(numberOfNodes).map(function(d){
      if (d<calcdeath) {
        var death =  true
      }else{
        var death = false
      }
      if (d == 0 & calcdeath < 1){
        return {
          radius: deathradii(calcdeath),
          dth : death
        }
      }
      else{
        return {
          radius: radius,
          dth : death
        }
      }
      })
    return nodes
  }
)})
    },
    {
      name: "createdict",
      value: (function(){return(
function createdict(a, b){
  var emptydict = [];
  for(var i in a, b){
    emptydict.push({
      key: a[i],
      value: b[i]
    })
  }
  return emptydict
  
}
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md `## histogram`
)})
    },
    {
      name: "margin",
      value: (function(){return(
{top: 20, right: 20, bottom: 20, left: 20}
)})
    },
    {
      name: "format",
      inputs: ["d3"],
      value: (function(d3){return(
d3.format("")
)})
    },
    {
      name: "math",
      inputs: ["require"],
      value: (function(require){return(
require('https://unpkg.com/mathjs@5.3.1/dist/math.min.js')
)})
    },
    {
      name: "iqr",
      inputs: ["d3","math"],
      value: (function(d3,math){return(
function iqr(inp){
  var range = d3.extent(inp)
  var mid = math.median(inp)
  var q1 = math.median([range[0], mid])
  var q3 = math.median([mid, range[1]])
  var out = [q1, q3]
  return out
}
)})
    }
  ]
};

const m1 = {
  id: "@jashkenas/inputs",
  variables: [
    {
      name: "slider",
      inputs: ["input"],
      value: (function(input){return(
function slider(config = {}) {
  let {value, min = 0, max = 1, step = "any", precision = 2, title, description, getValue, format, display, submit} = config;
  if (typeof config == "number") value = config;
  if (value == null) value = (max + min) / 2;
  precision = Math.pow(10, precision);
  if (!getValue) getValue = input => Math.round(input.valueAsNumber * precision) / precision;
  return input({
    type: "range", title, description, submit, format, display,
    attributes: {min, max, step, value},
    getValue
  });
}
)})
    },
    {
      name: "input",
      inputs: ["html","d3format"],
      value: (function(html,d3format){return(
function input(config) {
  let {
    form,
    type = "text",
    attributes = {},
    action,
    getValue,
    title,
    description,
    format,
    display,
    submit,
    options
  } = config;
  if (!form)
    form = html`<form>
	<input name=input type=${type} />
  </form>`;
  const input = form.input;
  Object.keys(attributes).forEach(key => {
    const val = attributes[key];
    if (val != null) input.setAttribute(key, val);
  });
  if (submit)
    form.append(
      html`<input name=submit type=submit style="margin: 0 0.75em" value="${
        typeof submit == "string" ? submit : "Submit"
      }" />`
    );
  form.append(
    html`<output name=output style="font: 14px Menlo, Consolas, monospace; margin-left: 0.5em;"></output>`
  );
  if (title)
    form.prepend(
      html`<div style="font: 700 0.9rem sans-serif;">${title}</div>`
    );
  if (description)
    form.append(
      html`<div style="font-size: 0.85rem; font-style: italic;">${description}</div>`
    );
  if (format) format = d3format.format(format);
  if (action) {
    action(form);
  } else {
    const verb = submit
      ? "onsubmit"
      : type == "button"
        ? "onclick"
        : type == "checkbox" || type == "radio"
          ? "onchange"
          : "oninput";
    form[verb] = e => {
      e && e.preventDefault();
      const value = getValue ? getValue(input) : input.value;
      if (form.output)
        form.output.value = display
          ? display(value)
          : format
            ? format(value)
            : value;
      form.value = value;
      if (verb !== "oninput")
        form.dispatchEvent(new CustomEvent("input", { bubbles: true }));
    };
    if (verb !== "oninput")
      input.oninput = e => e && e.stopPropagation() && e.preventDefault();
    if (verb !== "onsubmit") form.onsubmit = e => e && e.preventDefault();
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
          ${options.map(({ value, label }) => Object.assign(html`<option>`, {
              value,
              selected: Array.isArray(formValue)
                ? formValue.includes(value)
                : formValue === value,
              textContent: label
            }))}
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
  let {
    form,
    type = "text",
    attributes = {},
    action,
    getValue,
    title,
    description,
    format,
    display,
    submit,
    options
  } = config;
  if (!form)
    form = html`<form>
	<input name=input type=${type} />
  </form>`;
  const input = form.input;
  Object.keys(attributes).forEach(key => {
    const val = attributes[key];
    if (val != null) input.setAttribute(key, val);
  });
  if (submit)
    form.append(
      html`<input name=submit type=submit style="margin: 0 0.75em" value="${
        typeof submit == "string" ? submit : "Submit"
      }" />`
    );
  form.append(
    html`<output name=output style="font: 14px Menlo, Consolas, monospace; margin-left: 0.5em;"></output>`
  );
  if (title)
    form.prepend(
      html`<div style="font: 700 0.9rem sans-serif;">${title}</div>`
    );
  if (description)
    form.append(
      html`<div style="font-size: 0.85rem; font-style: italic;">${description}</div>`
    );
  if (format) format = d3format.format(format);
  if (action) {
    action(form);
  } else {
    const verb = submit
      ? "onsubmit"
      : type == "button"
        ? "onclick"
        : type == "checkbox" || type == "radio"
          ? "onchange"
          : "oninput";
    form[verb] = e => {
      e && e.preventDefault();
      const value = getValue ? getValue(input) : input.value;
      if (form.output)
        form.output.value = display
          ? display(value)
          : format
            ? format(value)
            : value;
      form.value = value;
      if (verb !== "oninput")
        form.dispatchEvent(new CustomEvent("input", { bubbles: true }));
    };
    if (verb !== "oninput")
      input.oninput = e => e && e.stopPropagation() && e.preventDefault();
    if (verb !== "onsubmit") form.onsubmit = e => e && e.preventDefault();
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
  id: "dd5f81f9e660ab37@1438",
  modules: [m0,m1]
};

export default notebook;
