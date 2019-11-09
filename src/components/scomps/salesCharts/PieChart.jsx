import React, { Component } from "react";
import * as d3 from "d3";

var width = 300,
  height = 300,
  radius = Math.min(width, height) / 4;

var fillColor ='hsla(104, 51%, 40%, 1)'

class Chart extends Component {
  constructor(props) {
    super(props);
    this.svgRef = React.createRef();
    this.color = d3.scaleOrdinal([
      "#66c2a5",
      "#fc8d62",
      "#8da0cb",
      "#e78ac3",
      "#a6d854",
      "#ffd92f"
    ]);
    this.pie = d3
      .pie()
      .value(d => {
        return d.value;
      })
      .sort(null);

    this.arc = d3
      .arc()
      .innerRadius(0)
      .outerRadius(radius);
    this.outerArc = d3
      .arc()
      .innerRadius(radius * 0.9)
      .outerRadius(radius * 0.9);

    this.dTweenCache = angleConstructor(this.props.data.length);
  }

  componentDidMount() {
    this.drawChart();
    this.drawLabels();
  }

  drawChart() {
    this.delem = d3.select(this.svgRef.current);
    this.chart = this.delem
      .append("g")
      .attr("fill", fillColor)
      .attr("class", "pie-slices")
      .attr("transform", `translate(${width / 2}, ${height / 2})`);

    this.data = this.pie(this.props.data);

    this.chart
      .selectAll("path")
      .data(this.data)
      .enter()
      .append("path")
      .attr("stroke", "white")
      .attr("stroke-width", "2px")
      .attr("d", (d, i) => {
        this.dTweenCache[i] = d;
        return this.arc(d);
      })
      .on("click", d => {
        this.changeItem(d);
      });
  }

  changeItem(d, i) {
    var item = d;
    this.props.onClick(item);
  }

  drawLabels() {
    this.labels = this.delem
      .append("g")
      .attr("class", "pie-labels")
      .attr("transform", `translate(${width / 2}, ${height / 2})`);

    this.lines = this.delem
      .append("g")
      .attr("class", "pie-lines")
      .attr("transform", `translate(${width / 2}, ${height / 2})`);

    this.labels
      .selectAll("text")
      .data(this.data)
      .enter()
      .append("text")
      .attr("dy", "8px")
      .text(d => {
        return `${d.data.label} - ${d.data.value}`;
      })
      .attr("transform", d => {
        var pos = this.outerArc.centroid(d);
        pos[0] = radius * (midAngle(d) < Math.PI ? 1 : -1);

        return `translate(${pos})`;
      })
      .style("text-anchor", function(d) {
        return midAngle(d) < Math.PI ? "start" : "end";
      });

    this.lines
      .selectAll("polyline")
      .data(this.data)
      .enter()
      .append("polyline")
      .attr("opacity", ".4")
      .attr("stroke", "black")
      .attr("stroke-width", "2px")
      .attr("fill", "none")
      .attr("points", d => {
        var pos = this.outerArc.centroid(d);
        pos[0] = radius * 0.95 * (midAngle(d) < Math.PI ? 1 : -1);

        return [this.arc.centroid(d), this.outerArc.centroid(d), pos];
      });
  }

  componentDidUpdate() {
    this.labels.remove();
    this.lines.remove();
    this.updateChart();
    this.drawLabels();
    this.higlightPie();
  }

  updateChart() {
    this.data = this.pie(this.props.data);
    this.chart
      .selectAll("path")
      .data(this.data)
      .transition()
      .attrTween("d", (d, i) => {
        var interpolate = d3.interpolate(this.dTweenCache[i], d);
        this.dTweenCache[i] = d;
        return t => {
          return this.arc(interpolate(t));
        };
      });
  }

  higlightPie() {
    var { currentSelection } = this.props;
    var path = this.chart.selectAll(
      `${
        currentSelection
          ? `path:nth-child(${currentSelection.index + 1})`
          : "path"
      }`
    );
    if (currentSelection) {
      this.chart.selectAll("path").attr("fill", fillColor);
      path.attr("fill", "red");
    } else {
      path.attr("fill", fillColor);
    }
  }

  render() {
    return <svg height={height} width={width} ref={this.svgRef}></svg>;
  }
}

class PieChart extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div style={{ width: "fit-content", margin: "auto", paddingLeft: 10 }}>
        {this.props.data ? (
          <Chart
            currentSelection={this.props.currentSelection}
            data={this.props.data}
            onClick={a => {
              this.props.onclick(a);
            }}
          />
        ) : (
          <div>Loading...</div>
        )}
      </div>
    );
  }
}
export default PieChart;


const angleConstructor = l => {
  var d = [];
  for (var i = 0; i < l; i++) {
    d.push({ startAngle: 0, endAngle: 0 });
  }
  return d;
};

function midAngle(d) {
  return d.startAngle + (d.endAngle - d.startAngle) / 2;
}
