/* Copyright (c) 2017, Art Compiler LLC */
/* @flow */
import {
  assert,
  message,
  messages,
  reserveCodeRange,
  decodeID,
  encodeID,
} from "./share.js";
import * as React from "react";
import * as d3 from "d3";
window.gcexports.viewer = (function () {
  function capture(el) {
    return null;
  }
  function render(nodes, props) {
    let elts = [];
    if (!(nodes instanceof Array)) {
      // HACK not all arguments are arrays. Not sure they should be.
      nodes = [nodes];
    }
    nodes.forEach(function (n, i) {
      let args = [];
      if (n.args) {
        args = render(n.args, props);
      }
      switch (n.type) {
      case "table":
        elts.push(
          <table className="table" key={i} style={n.style} {...n.attrs}>
            {args}
          </table>
        );
        break;
      case "thead":
        elts.push(
          <thead key={i} style={n.style} {...n.attrs}>
            {args}
          </thead>
        );
        break;
      case "tbody":
        elts.push(
          <tbody key={i} style={n.style} {...n.attrs}>
            {args}
          </tbody>
        );
        break;
      case "tr":
        elts.push(
          <tr key={i} style={n.style} {...n.attrs}>
            {args}
          </tr>
        );
        break;
      case "th":
        elts.push(
          <th key={i} style={n.style} {...n.attrs}>
            {args}
          </th>
        );
        break;
      case "td":
        elts.push(
          <td key={i} style={n.style} {...n.attrs}>
            {args}
          </td>
        );
        break;
      case "container":
        elts.push(
          <div className="container" key={i} style={n.style} {...n.attrs}>
            {args}
          </div>
        );
        break;
      case "container-fluid":
        elts.push(
          <div className="container-fluid" key={i} style={n.style} {...n.attrs}>
            {args}
          </div>
        );
        break;
      case "table":
        elts.push(
          <table key={i} style={n.style} {...n.attrs}>
            {args}
          </table>
        );
        break;
      case "thead":
        elts.push(
          <thead key={i} style={n.style} {...n.attrs}>
            {args}
          </thead>
        );
        break;
      case "tbody":
        elts.push(
          <tbody className="container" key={i} style={n.style} {...n.attrs}>
            {args}
          </tbody>
        );
        break;
      case "tr":
        elts.push(
          <tr key={i} style={n.style} {...n.attrs}>
            {args}
          </tr>
        );
        break;
      case "th":
        elts.push(
          <th key={i} style={n.style} {...n.attrs}>
            {args}
          </th>
        );
        break;
      case "td":
        elts.push(
          <td key={i} style={n.style} {...n.attrs}>
            {args}
          </td>
        );
        break;
      case "row":
      case "col":
      case "col-4":
      case "col-2":
      case "col-sm":
      case "col-sm-2":
      case "col-sm-3":
      case "col-sm-4":
      case "col-md":
      case "col-md-2":
      case "col-md-3":
      case "col-md-4":
        elts.push(
          <div className={n.type} key={i} style={n.style} {...n.attrs}>
            {args}
          </div>
        );
        break;
      case "col-2":
        elts.push(
          <div className={"col-sm-4 col-md-3 col-lg-2"} key={i} style={n.style} {...n.attrs}>
            {args}
          </div>
        );
        break;
      case "bar-chart":
        elts.push(
          <BarChart key={i} style={n.style} {...n}/>
        );
        break;
      case "pack-chart":
        elts.push(
          <PackChart key={i} style={n.style} {...n}/>
        );
        break;
      case "stack-chart":
        elts.push(
          <StackChart key={i} style={n.style} {...n}/>
        );
        break;
      case "treemap-chart":
        elts.push(
          <TreemapChart key={i} style={n.style} {...n}/>
        );
        break;
      case "twoColumns":
        elts.push(
          <div className="two columns" key={i} style={n.style} {...n.attrs}>
            {args}
          </div>
        );
        break;
      case "threeColumns":
        elts.push(
          <div className="three columns" key={i} style={n.style} {...n.attrs}>
            {args}
          </div>
        );
        break;
      case "fourColumns":
        elts.push(
          <div className="four columns" key={i} style={n.style} {...n.attrs}>
            {args}
          </div>
        );
        break;
      case "fiveColumns":
        elts.push(
          <div className="five columns" key={i} style={n.style} {...n.attrs}>
            {args}
          </div>
        );
        break;
      case "sixColumns":
        elts.push(
          <div className="six columns" key={i} style={n.style} {...n.attrs}>
            {args}
          </div>
        );
        break;
      case "sevenColumns":
        elts.push(
          <div className="seven columns" key={i} style={n.style} {...n.attrs}>
            {args}
          </div>
        );
        break;
      case "eightColumns":
        elts.push(
          <div className="eight columns" key={i} style={n.style} {...n.attrs}>
            {args}
          </div>
        );
        break;
      case "nineColumns":
        elts.push(
          <div className="nine columns" key={i} style={n.style} {...n.attrs}>
            {args}
          </div>
        );
        break;
      case "tenColumns":
        elts.push(
          <div className="ten columns" key={i} style={n.style} {...n.attrs}>
            {args}
          </div>
        );
        break;
      case "elevenColumns":
        elts.push(
          <div className="eleven columns" key={i} style={n.style} {...n.attrs}>
            {args}
          </div>
        );
        break;
      case "twelveColumns":
        elts.push(
          <div className="twelve columns" key={i} style={n.style} {...n.attrs}>
            {args}
          </div>
        );
        break;
      case "oneThirdColumn":
        elts.push(
          <div className="one-third column" key={i} style={n.style} {...n.attrs}>
            {args}
          </div>
        );
        break;
      case "twoThirdsColumn":
        elts.push(
          <div className="two-thirds column" key={i} style={n.style} {...n.attrs}>
            {args}
          </div>
        );
        break;
      case "oneHalfColumn":
        elts.push(
          <div className="one-half column" key={i} style={n.style} {...n.attrs}>
            {args}
          </div>
        );
        break;
      case "h1":
        elts.push(
          <h1 key={i} style={n.style} {...n.attrs}>
            {args}
          </h1>
        );
        break;
      case "h2":
        elts.push(
          <h2 key={i} style={n.style} {...n.attrs}>
            {args}
          </h2>
        );
        break;
      case "h3":
        elts.push(
          <h3 key={i} style={n.style} {...n.attrs}>
            {args}
          </h3>
        );
        break;
      case "h4":
        elts.push(
          <h4 key={i} style={n.style} {...n.attrs}>
            {args}
          </h4>
        );
        break;
      case "h5":
        elts.push(
          <h5 key={i} style={n.style} {...n.attrs}>
            {args}
          </h5>
        );
        break;
      case "h6":
        elts.push(
          <h6 key={i} style={n.style} {...n.attrs}>
            {args}
          </h6>
        );
        break;
      case "br":
        elts.push(
          <br key={i} />
        );
        break;
      case "code":
        n.style.fontSize = n.style && n.style.fontSize ? n.style.fontSize : "90%";
        elts.push(
          <pre key={i} style={n.style} {...n.attrs}><code>
            {args}
          </code></pre>
        );
        break;
      case "cspan":
        elts.push(
          <code key={i} style={n.style} {...n.attrs}>
            {args}
          </code>
        );
        break;
      case "textarea":
        elts.push(
          <textarea className="u-full-width" key={i} rows="1" onChange={handleTextChange} style={n.style} {...n.attrs}>
          </textarea>
        );
        break;
      case "button":
        elts.push(
          <a className="button" key={i} style={n.style} {...n.attrs}>
            {args}
          </a>
        );
        break;
      case "ul":
        elts.push(
          <ul key={i} style={n.style} {...n.attrs}>
            {args}
          </ul>
        );
        break;
      case "ol":
        elts.push(
          <ol key={i} style={n.style} {...n.attrs}>
            {args}
          </ol>
        );
        break;
      case "li":
        elts.push(
          <li key={i} style={n.style} {...n.attrs}>
            {args}
          </li>
        );
        break;
      case "img":
        elts.push(
          <img key={i} onError={(e) => {e.target.style.display='none'}} style={n.style} {...n.attrs}/>
        );
        break;
      case "a":
        elts.push(
          <a key={i} style={n.style} {...n.attrs}>
            {args}
          </a>
        );
        break;
      case "div":
        elts.push(<div key={i} style={n.style} {...n.attrs}>{args}</div>);
        break;
      case "title":
        document.title = n.value;
        break;
      case "graffito":
        // elts.push(
        //   <div key={i} style={{"position": "relative"}}>
        //     <iframe style={n.style} {...n.attrs}/>
        //     <a href={n.attrs.src} target="L116-CHILD" style={{
        //       "position": "absolute",
        //       "top": 0,
        //       "left": 0,
        //       "display": "inline-block",
        //       "width": "100%",
        //       "height": "100%",
        //       "zIndex": 5}}></a>
        //   </div>
        // );
        // elts.push(
        //   <div key={i} style={{"position": "relative"}}>
        //     <iframe style={n.style} {...n.attrs}/>
        //   </div>
        // );
        let src = n.attrs.src;
        let width = n.attrs.width;
        let height = n.style.height;
        elts.push(
          <HTMLView key={i} width={width} style={n.style} src={src} />
        );
        break;
      case "str":
        elts.push(<span className="u-full-width" key={i} style={n.style}>{""+n.value}</span>);
        break;
      default:
        break;
      }
    });
    return elts;
  }
  var PackChart = React.createClass({
    componentDidMount() {
      this.componentDidUpdate();
    },
    componentDidUpdate() {
      let root = d3.hierarchy(this.props.args.data)
         .sum(function(d) {
           return 1;
         })
//         .sort(function(a, b) { return b.value - a.value; });

       var svg = d3.select("svg.pack-chart"),
          width = +svg.attr("width"),
          height = +svg.attr("height");
      var format = d3.format(",d");
      var color = d3.scaleSequential(d3.interpolateMagma)
          .domain([-4, 4]);
      var pack = d3.pack()
          .size([width - 2, height - 2])
          .radius(d => {
            return d.data.type === "label" && 40 || 30; //d.data.name.length * 6;
          })
          .padding(3);
      pack(root);
      var node = svg.selectAll("g")
        .data(root.descendants())
        .enter().append("g")
        .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; })
        .attr("class", function(d) { return "node" + (!d.children ? " node--leaf" : d.depth ? "" : " node--root"); })
        .each(function(d) { d.node = this; })
          .on("mouseover", hovered(true))
        .on("mouseout", hovered(false));

      node.append("circle")
        .attr("id", function(d) { return "node-" + d.data.name; })
        .attr("r", function(d) {
          return d.r;
        })
        .style("fill", function(d) {
          return (
            d.depth === 0 && "#888" ||
            (d.depth === 1 || d.depth === 2 && d.data.type === "label") && "#AAA" ||
            (d.depth === 2 || d.data.type === "label") && "#CCC" ||
            "#EEE"
          );
        });

      var leaf = node.filter(function(d) { return !d.children; });

      leaf.append("clipPath")
        .attr("id", function(d) { return "clip-" + d.data.name; })
        .append("use")
        .attr("xlink:href", function(d) { return "#node-" + d.data.name + ""; });

      leaf.append("text")
        .attr("clip-path", function(d) { return "url(#clip-" + d.data.name + ")"; })
        .attr("text-anchor", "middle")
        .attr("font-size", d => {
          return d.data.type === "label" && 13 || 10;
        })
        .selectAll("tspan")
        .data(function(d) { return d.data.name.split(/(?=[A-Z][^A-Z])/g); })
        .enter().append("tspan")
        .attr("x", 0)
        .attr("y", function(d, i, nodes) {
          return 13 + (i - nodes.length / 2 - 0.5) * 12;
        })
        .text(function(d) { return d; });

      node.append("title")
        .text(function(d) { return d.data.name + "\n" + format(d.value); });

      function hovered(hover) {
        return function(d) {
          d3.selectAll(d.ancestors().map(function(d) { return d.node; })).classed("node--hover", hover);
        };
      }
    },
    render () {
      let width = this.props.width || 1500;
      let height = this.props.height || 1500;
      return (
        <svg className="pack-chart" width="1500" height="1500"/>
      );
    },
  });
  var TreemapChart = React.createClass({
    componentDidMount() {
      this.componentDidUpdate();
    },
    componentDidUpdate() {
      let root = d3.hierarchy(this.props.args.data)
         .sum(function(d) {
           return 100;
         })
         .sort(function(a, b) { return b.value - a.value; });

      d3.select("svg.treemap-chart").selectAll("*").remove();

      const svg = d3.select("svg.treemap-chart")
        .style("width", "100%")
        .style("height", "auto")
        .style("font", "14px sans-serif");

      const width = +svg.attr("width"),
            height = +svg.attr("height");

      const format = d3.format(",d");
      const color = d3.scaleOrdinal(d3.schemeCategory10);
      let treemapLayout = d3.treemap()
//                          .tile(d3.treemapBinary)
//                          .tile(d3.treemapDice)
//                          .tile(d3.treemapSlice)
//                          .tile(d3.treemapSliceDice)
                          .tile(d3.treemapSquarify.ratio(1))
                          .size([width, height])
                          .paddingInner(10)
                          .paddingOuter(10)
                          .paddingTop(45)
                          .round(true);
      treemapLayout(root);

      if (!root.children) {
        return;
      }

      let logoWidth = this.props.logoWidth || 50;

      const leaf = svg.selectAll("g")
        .data(root.children[0].descendants())
        .join("g")
        .attr("transform", d => {
          return `translate(${d.x0},${d.y0})`
        })
        .style("font", d => {
          return d.depth === 1 && "20px sans-serif" || "14px sans-serif";
        });

      leaf.append("title")
        .text(d => d.data.name);

      leaf.append("rect")
        .attr("id", d => (d.leafUid = d.data.name + "-rect"))
//        .attr("fill", d => { while (d.depth > 0) d = d.parent; return color(d.depth - 1); })
        .attr("fill-opacity", 1.0)
        .attr("width", d => d.x1 - d.x0)
        .attr("height", d => d.y1 - d.y0)
        .attr("rx", 10)
        .attr("ry", 10)
        .attr("stroke", d => d.depth < 3 && "#AAA" || "#FFF")
        .attr("stroke-width", "1")
        .style("fill", function(d) {
          return (
            d.depth === 0 && "#EEE" ||
            d.depth === 1 && "#EEE" ||
            d.depth === 2 && "#FFF" ||
            "#FFF"
          );
        })

      leaf.append("clipPath")
        .attr("id", d => (d.clipUid = d.data.name + "-clipPath"))
        .append("use")
        .attr("xlink:href", d => d.leafUid.href);

      leaf.append("text")
        .attr("clip-path", d => d.clipUid)
        .selectAll("tspan")
        .data(d => {
          return (
            (d.data.type === "company" || d.data.type === "category") && d.data.name.split(/(?=[A-Z][^A-Z])/g).slice(0,2) ||
            "" //d.data.name.split(/(?=[A-Z][^A-Z])/g)
          );
        })
        .join("tspan")
        .attr("x", 10)
        .attr("y", (d, i, nodes) => `${(i === nodes.length - 1) * 0.3 + 1.1 + i * 0.9}em`)
        .attr("fill-opacity", (d, i, nodes) => i === nodes.length - 1 ? 0.7 : null)
        .text(d => d);

      leaf.append("image")
        .attr("clip-path", d => d.clipUid)
        .attr("xlink:href", d => {
          return d.depth > 1 && d.data.logo || undefined
        })
        .attr("width", logoWidth)
        .attr("x", 3)
        .attr("y", 3);

      return svg.node();
    },
    render () {
      let width = this.props.width || 1200;
      let height = this.props.height || 700;
      return (
        <svg className="treemap-chart" width={width} height={height}/>
      );
    },
  });
  var StackChart = React.createClass({
    componentDidMount() {
      this.componentDidUpdate();
    },
    componentDidUpdate() {
//      d3.select("div.stack-chart").selectAll("*").remove();
    },
    render () {
      let props = this.props;
      var data = props.root ? [].concat(props.root) : [];
      var elts = render(data, props);
      let width = this.props.width || 1200;
      let height = this.props.height || 700;
      return (
        <div>
          <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css" crossOrigin="anonymous" />
          <div className="stack-chart viewer">
          {elts}
          </div>
        </div>
      );
    },
  });
  var Viewer = React.createClass({
    render () {
      // If you have nested components, make sure you send the props down to the
      // owned components.
      let props = this.props;
      var data = props.obj ? [].concat(props.obj) : [];
      var elts = render(data, props);
      return (
        <div>
          <link type="text/css" rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css" crossOrigin="anonymous" />
          <link type="text/css" rel="stylesheet" href="/style.css" />
          <div className="L112">
            {elts}
          </div>
        </div>
      );
    },
  });
  return {
    capture: capture,
    Viewer: Viewer
  };
})();
