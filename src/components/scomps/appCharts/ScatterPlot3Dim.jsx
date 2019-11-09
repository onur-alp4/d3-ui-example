import React, { Component } from "react";
import * as d3 from "d3";

const dayNames = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday"
];

var margin = { top: 10, right: 20, bottom: 30, left: 50 },
  width = 375 - margin.left - margin.right,
  height = 375 - margin.top - margin.bottom;

const Legend = props => {
  const bgColor = `linear-gradient(90deg, hsl(${props.max}, 100%, 50%) 0%, hsl(${props.min}, 100%, 50%) 100%)`;
  return (
    <div
      style={{
        width: 150,
        height: 25,
        background: bgColor,
        textAlign: "center",
        display: "flex",
        justifyContent: "space-between",
        marginTop: -60
      }}
    >
      <div>{0}</div>
      <div>{100}</div>
    </div>
  );
};

class Chart extends Component {
  constructor(props) {
    super(props);
    this.svgRef = React.createRef();
    this.legendref = React.createRef();
    this.state = {};
  }

  componentDidMount() {
    this.drawChart();
  }

  componentDidUpdate() {
    d3.selectAll(".dot")
      .transition()
      .duration(1000)
      .ease(d3.easeCubicOut)
      .attr("r", 0)
      .remove();
    this.drawChart();
  }

  drawChart() {
    var { arr, maxBSize } = this.props.data;

    var delem = d3
      .select(this.svgRef.current)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var xScale = d3
      .scaleLinear()
      .domain([0, 7])
      .range([0, width]);

    var xAxis = d3
      .axisBottom(xScale)
      .ticks(dayNames.length)
      .tickFormat(d => {
        return dayNames[d - 1];
      });

    delem
      .append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
      .selectAll("text")
      .attr("transform", "rotate(45)")
      .attr("y", 0)
      .attr("x", 9)
      .style("text-anchor", "start");

    var yScale = d3
      .scaleLinear()
      .domain([0, 24])
      .range([height, 0]);

    var yAxis = d3
      .axisLeft(yScale)
      .ticks(12)
      .tickFormat(d => {
        return `${d}:00`;
      });

    delem.append("g").call(yAxis);

    // var zScale = d3
    //   .scaleLinear()
    //   .domain([0, maxBSize])
    //   .range([0, 20]);

    var colorScale = d3
      .scaleLinear()
      .domain([0, maxBSize])
      .range([100, 0]);

    delem
      .append("g")
      .selectAll("circle")
      .data(arr)
      .enter()
      .append("circle")
      .attr("class", "dot")
      .attr("cx", d => {
        return xScale(d[0]);
      })
      .attr("cy", d => {
        return yScale(d[1]);
      })
      .style("fill", function(d) {
        return `hsl( ${colorScale(d[2])} , 80%, 50%)`;
      })
      .attr("stroke", "white")
      .style("stroke-width", "1px")
      .transition()
      .duration(1000)
      .ease(d3.easeCubicInOut)
      .attr("r", d => {
        return d > 90 ? 20 : 8;
      });

    var textA = d3.select(this.legendref.current);

    var defaultText = "Tip: Hover or tap on any dot to see value of it";

    textA.text(defaultText);

    delem
      .selectAll(".dot")
      .on("mouseover", function(d) {
        textA.text(function() {
          return `Server load: ${d[2]}%`;
        });
      })
      .on("mouseout", function() {
        textA.text(defaultText);
      });
  }

  render() {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <svg
          ref={this.svgRef}
          width={width + margin.left + margin.right + 100}
          height={100 + height + margin.top + margin.bottom}
          style={{
            marginLeft: 75
          }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Legend min={10} max={this.props.data.maxBSize} />
          <div style={{ marginTop: 10 }} ref={this.legendref}></div>
        </div>
      </div>
    );
  }
}

class ScatterPlot3Dim extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: rndmData(100)
    };
  }

  componentDidMount() {
    this.dataUpdater();
  }
  componentDidUpdate() {
    this.dataUpdater();
  }

  dataUpdater() {
    var sdata = rndmData(100);
    this.setState({ data: sdata });
  }

  shouldComponentUpdate(nextP) {
    if (nextP.lastUpdate === this.props.lastUpdate) {
      return false;
    }
    return true;
  }

  render() {
    return (
      <div>
        <Chart data={this.state.data} />
      </div>
    );
  }
}
export default ScatterPlot3Dim;

const randomNum = x => Math.floor(Math.random() * x);

const dayNumber = 7;

const maxHour = 24;

const rndmData = maxBSize => {
  const arr = [];

  for (var i = 1; i <= dayNumber; i++) {
    var dCache1 = [];

    for (var j = 0; j < maxHour; j++) {
      if (Math.random() < 0.6) {
        var elem = [i, j, randomNum(maxBSize)];
        dCache1.push(elem);
      }
    }
    arr.push(...dCache1);
  }
  return {
    arr,
    maxBSize
  };
};
