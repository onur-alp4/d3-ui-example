import React, { Component } from "react";
import * as d3 from "d3";

// 'd3-selection'
// 'd3-scale'

// 'd3-shape for pie and arc'
// 'd3-format'

const specs = {
  width: 200,
  height: 200,
  innerRadius: 60,
  outerRadius: 100
};

const data = [
  { stars: 1, value: 12 },
  { stars: 2, value: 5 },
  { stars: 3, value: 6 },
  { stars: 4, value: 6 },
  { stars: 5, value: 9 }
];

class Chart extends Component {
  constructor(props) {
    super(props);
    this.svgRef = React.createRef();
    this.createPie = d3
      .pie()
      .value(d => d.value)
      .sort(null);

    this.createArc = d3
      .arc()
      .innerRadius(specs.innerRadius)
      .outerRadius(specs.outerRadius);

    this.colors = d3.scaleOrdinal(d3.schemeCategory10);
    this.format = d3.format(".2f");
    this.dTweenCache = angleConstructor(this.props.data.length);
  }

  componentDidMount() {
    const data = this.createPie(this.props.data);
    const group = d3.select(this.svgRef.current);

    const groupWithData = group.selectAll("g.arc").data(data);

    groupWithData.exit().remove();

    const groupWithUpdate = groupWithData
      .enter()
      .append("g")
      .attr("class", "arc");

    const path = groupWithUpdate
      .append("path")
      .merge(groupWithData.select("path.arc"));

    path
      .attr("class", "arc")
      .attr("d", this.createArc)
      .attr("fill", (d, i) => this.colors(i));

    const text = groupWithUpdate
      .append("text")
      .merge(groupWithData.select("text"));

    text
      .attr("text-anchor", "middle")
      .attr("alignment-baseline", "middle")
      .attr("transform", d => `translate(${this.createArc.centroid(d)})`)
      .style("fill", "white")
      .style("font-size", 10)
      .text(d => `${d.data.stars} star:${this.format(d.value)}`);
  }

  componentDidUpdate() {
    const data = this.createPie(this.props.data);
    const group = d3.select(this.svgRef.current);
    const groupWithData = group.selectAll("g.arc").data(data);

    groupWithData.exit().remove();

    const groupWithUpdate = groupWithData
      .enter()
      .append("g")
      .attr("class", "arc");

    const path = groupWithUpdate
      .append("path")
      .merge(groupWithData.select("path.arc"));

    path
      .attr("class", "arc")
      .attr("fill", (d, i) => {
        var color = `hsl(41, 90%, ${80 - 6*i}%)`
        return color
      })
      .transition()
      .duration(500)
      .attrTween("d", (d, i) => {
        var interpolate = d3.interpolate(this.dTweenCache[i], d);
        //
        return t => {
          return this.createArc(interpolate(t));
        };
      });

    const text = groupWithUpdate
      .append("text")
      .merge(groupWithData.select("text"));

    text
      .attr("text-anchor", "middle")
      .attr("alignment-baseline", "middle")
      .transition()
      .duration(500)
      .attr("transform", d => `translate(${this.createArc.centroid(d)})`)
      .style("fill", "#505c62")
      .style("font-size", 10)
      .tween("text", (d, i, nodes) => {
        var interpolate = d3.interpolate(this.dTweenCache[i], d);
        this.dTweenCache[i] = interpolate();
        return t => {
          d3.select(nodes[i]).text(
            `${d.data.stars} star:${this.format(interpolate(t).value)}`
          );
        };
      });
  }

  render() {
    return (
      <svg width={specs.width} height={specs.height}>
        <g
          ref={this.svgRef}
          transform={`translate(${specs.outerRadius} ${specs.outerRadius})`}
        />
      </svg>
    );
  }
}

class DonutChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data
    };
  }

  componentDidMount() {
    this.dataUpdater();
  }
  componentDidUpdate() {
    this.dataUpdater();
  }

  dataUpdater() {
    var data = rndmData(5);
    this.setState({ data });
  }

  shouldComponentUpdate(nextP) {
    if (nextP.lastUpdate === this.props.lastUpdate) {
      return false;
    }
    return true;
  }

  render() {
    return (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transform: "scale(1.2)",
          position: "relative",
          top: -20
        }}
      >
        <Chart data={this.state.data} />
      </div>
    );
  }
}
export default DonutChart;

function rndmData(d) {
  var data = [];
  for (var i = 0; i < d; i++) {
    data.push({
      stars: i + 1,
      value: Math.floor(Math.random() * 100)
    });
  }
  return data;
}

const angleConstructor = l => {
  var d = [];
  for (var i = 0; i < l; i++) {
    d.push({ startAngle: 0, endAngle: 0 });
  }
  return d;
};
