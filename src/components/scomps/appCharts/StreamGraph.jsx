import React, { Component } from "react";
import * as d3 from "d3";

var colors = [
  {
    platform: "Web",
    color: "#2431a8"
  },
  {
    platform: "Android",
    color: "#61d22d"
  },
  {
    platform: "iOS",
    color: "#8c8c8c"
  }
];

var data = [
  { day: "Mon", Web: 120, iOS: 180, Android: 100 },
  { day: "Tue", Web: 60, iOS: 185, Android: 105 },
  { day: "Wed", Web: 100, iOS: 215, Android: 110 },
  { day: "Thu", Web: 80, iOS: 230, Android: 105 },
  { day: "Fri", Web: 120, iOS: 240, Android: 105 },
  { day: "Sat", Web: 120, iOS: 240, Android: 105 },
  { day: "Sun", Web: 90, iOS: 90, Android: 95 }
];

var width = 300,
  height = 300;

function Legend() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row-reverse",
        justifyContent: "center"
      }}
    >
      {colors.map(e => {
        return (
          <div
            style={{
              display: "flex",
              margin: "10px",
              alignItems: "center",
              width: "fit-content"
            }}
            key={e.platform}
          >
            <span
              style={{
                backgroundColor: e.color,
                width: 25,
                height: 25,
                marginRight: "5px"
              }}
            ></span>
            <span>{e.platform}</span>
          </div>
        );
      })}
    </div>
  );
}

class Chart extends Component {
  constructor(props) {
    super(props);
    this.svgRef = React.createRef();
    this.state = {};
  }

  componentDidMount() {
    this.drawChart();
  }

  componentDidUpdate() {
    // d3.selectAll(".stacks").remove();
    this.updateChart();
  }

  updateChart() {
    const delem = d3
      .select(this.svgRef.current)
      .attr("height", height)
      .attr("width", width);

    var keys = d3.stack().keys(["Web", "iOS", "Android"]);
    var keyWSelections = keys;
    // .order(d3.stackOrderNone)
    // .offset(d3.stackOffsetNone);
    var stacks = keyWSelections(this.props.data);


    const yMax = d3.max(stacks[stacks.length - 1], e => {
      return Math.max(e[0], e[1]);
    });

    this.y = d3
      .scaleLinear()
      .domain([0, yMax + yMax / 10])
      .range([height, 0]);

    this.yAxis = d3.axisLeft(this.y);

    const area = d3
      .area()
      .x((d, i) => {
        return this.x(i);
      })
      .y0(d => {
        return this.y(d[0]);
      })
      .y1(d => {
        return this.y(d[1]);
      });

    delem
      .select(".stacks")
      .selectAll(".stack")
      .data(stacks)
      .transition()
      .duration(500)
      .style("color", (d, i) => {
        var c = colors[i].color;
        return c;
      })
      .attr("d", area);

    var bAxis = this.axisGroup.select(".axises").select(".bottomAxis");

    bAxis
      .attr("transform", "translate(0," + height + ")")
      .transition()
      .duration(500)
      .call(this.xAxis);

    this.axisGroup
      .select(".axises")
      .select(".leftAxis")
      .transition()
      .duration(500)
      .call(this.yAxis);
  }

  drawChart() {
    const delem = d3
      .select(this.svgRef.current)
      .attr("height", height)
      .attr("width", width);

    var keys = d3.stack().keys(["Web", "iOS", "Android"]);
    var keyWSelections = keys;

    var stacks = keyWSelections(this.props.data);

    this.x = d3
      .scaleLinear()
      .domain([0, data.length - 1])
      .range([0, width]);

    const yMax = d3.max(stacks[stacks.length - 1], e => {
      return Math.max(e[0], e[1]);
    });

    this.y = d3
      .scaleLinear()
      .domain([0, yMax + yMax / 10])
      .range([height, 0]);

    const area = d3
      .area()
      .x((d, i) => {
        return this.x(i);
      })
      .y0(d => {
        return this.y(d[0]);
      })
      .y1(d => {
        return this.y(d[1]);
      });

    delem
      .append("g")
      .attr("class", "stacks")
      .selectAll(".stack")
      .data(stacks)
      .enter()
      .append("path")
      .attr("class", "stack")
      .style("fill", "currentColor")
      .transition()
      .duration(500)
      .style("color", (d, i) => {
        var c = colors[i].color;
        return c;
      })
      .attr("d", area);

    this.xAxis = d3
      .axisBottom(this.x)
      .ticks(data.length - 1)
      .tickFormat(i => {
        var cd = this.props.data[i];
        return cd.day;
      });

    this.yAxis = d3.axisLeft(this.y);

    this.axisGroup = delem.append("g").attr("class", "axises");

    this.axisGroup
      .append("g")
      .attr("class", "bottomAxis")
      .attr("transform", "translate(0," + height + ")")
      .call(this.xAxis);

    this.axisGroup
      .append("g")
      .attr("class", "leftAxis")
      .call(this.yAxis);
  }

  render() {
    return (
      <svg style={{ margin: 50, overflow: "visible" }} ref={this.svgRef} />
    );
  }
}

class StreamGraph extends Component {
  constructor(props) {
    super(props);
    this.state = { data: data };
  }
  componentDidMount() {
    this.dataUpdater();
  }
  componentDidUpdate() {
    this.dataUpdater();
  }

  dataUpdater() {
    var sdata = rndmData(data, 150);
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
        <Legend />
      </div>
    );
  }
}
export default StreamGraph;

const rndmData = (arr, maxVal) => {
  var arrCache = arr.map(e => {
    var newE = {
      Web: Math.floor(Math.random() * maxVal),
      iOS: Math.floor(Math.random() * maxVal),
      Android: Math.floor(Math.random() * maxVal)
    };
    return newE;
  });
  return arrCache;
};