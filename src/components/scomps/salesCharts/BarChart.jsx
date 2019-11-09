import React, { Component } from "react";
import * as d3 from "d3";

var styles = {
  height: 180,
  width: 335
};

class Chart extends Component {
  constructor(props) {
    super(props);
    this.svgRef = React.createRef();
    this.textdTweenCache = [];
  }
  componentDidMount() {
    this.SetyScale(styles.height);
    this.SetXScale(100);
    this.drawChart(styles.height, 20);
    this.drawAxis(styles.height + 10);
  }

  componentDidUpdate() {
    this.SetyScale(styles.height);
    this.updateChart(styles.height, 20);
  }

  drawChart(height, width) {
    const { data } = this.props;
    // chart Area
    this.cArea = d3
      .select(this.svgRef.current)
      .append("g")
      .attr("fill", "steelBlue")
      .attr("transform", `translate(${35}, ${10})`);

    this.cArea
      .selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("width", width)
      .attr("x", (d, i) => {
        return this.xScale(i);
      })
      .attr("y", () => {
        return height;
      })
      .transition()
      .attr("y", d => {
        return height - this.yScale(d.value);
      })
      .attr("height", d => {
        return this.yScale(d.value);
      });

    // labels
    this.cArea
      .selectAll("text")
      .data(data)
      .enter()
      .append("text")
      .text(d => {
        return d.value;
      })
      .style("width", width)
      .style("text-align", "center")
      .attr("x", (d, i) => {
        return this.xScale(i);
      })
      .attr("y", d => {
        var h = height - this.yScale(d.value);
        this.textdTweenCache.push(h);

        return h;
      })
      .attr("font-size", "12px")
      .attr("fill", "black");
  }

  updateChart(height, width) {
    const { data } = this.props;
    this.cArea
      .selectAll("rect")
      .data(data)
      .transition()
      .attr("y", d => {
        return height - this.yScale(d.value);
      })
      .attr("height", d => {
        return this.yScale(d.value);
      });

    this.cArea
      .selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("width", width)
      .attr("x", (d, i) => {
        return this.xScale(i);
      })
      .attr("y", () => {
        return height;
      })
      .transition()
      .attr("y", d => {
        return height - this.yScale(d.value);
      })
      .attr("height", d => {
        return this.yScale(d.value);
      });

    this.cArea
      .selectAll("rect")
      .data(data)
      .exit()
      .transition()
      .attr("y", height)
      .attr("height", 0)
      .remove();
    // labels
    this.cArea.selectAll("text").remove();
    this.cArea
      .selectAll("text")
      .data(data)
      .enter()
      .append("text")
      .text(d => {
        return d.value;
      })
      .style("width", width)
      .style("text-align", "center")
      .attr("x", (d, i) => {
        return this.xScale(i);
      })
      .attr("font-size", "12px")
      .attr("fill", "black")
      .attr("y", (d, i) => {
        return this.textdTweenCache[i];
      })
      .transition()
      .attr("y", (d, i) => {
        var h = height - this.yScale(d.value);
        this.textdTweenCache[i] = h;
        return h;
      });
  }

  drawAxis(height) {
    // axis Area
    this.aArea = d3.select(this.svgRef.current).append("g");

    this.aArea
      .append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(
        d3
          .axisBottom(this.xScale)
          .ticks(this.props.data.length)
          .tickFormat((d, i) => {
            var tick = this.props.data[i].label;
            return tick;
          })
      )
      .selectAll("text")
      .attr("transform", "rotate(45)")
      .attr("y", 0)
      .attr("x", 9)
      .style("text-anchor", "start");
  }

  SetyScale(rMax) {
    var a = this.props.data.map(e => {
      return e.value;
    });
    var dMax = Math.max(...a);
    this.yScale = d3
      .scaleLinear()
      .domain([0, dMax + (dMax * 25) / 100])
      .range([0, rMax]);
  }

  SetXScale(rMax) {
    this.xScale = d3
      .scaleLinear()
      .domain([1, this.props.data.length])
      .range([20, 300]);
  }

  render() {
    return (
      <svg
        height={styles.height + 10}
        style={{ width: styles.width, paddingBottom: 50 }}
        ref={this.svgRef}
      />
    );
  }
}

class BarChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data
    };
  }

  render() {
    return (
      <div
        style={{
          width: "fit-content",
          margin: "auto",
          height: "100%",
          display: "flex",
          alignItems: "center",
          position: "relative",
          top: "-35px"
        }}
      >
        {this.props.data ? (
          <Chart data={this.props.data} />
        ) : (
          <div>Loading...</div>
          
        )}
      </div>
    );
  }
}
export default BarChart;

