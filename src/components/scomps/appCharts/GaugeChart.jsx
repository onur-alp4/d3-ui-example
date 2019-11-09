import React, { Component } from "react";
import * as d3 from "d3";

var config = {
  size: 300,
  arcInset: 150,
  arcWidth: 60,

  pointerWidth: 8,
  pointerOffset: 0,
  pointerHeadLengthPercent: 0.9,

  minValue: 0,
  maxValue: 100000,

  minAngle: -90,
  maxAngle: 90,

  transitionMs: 750,

  currentLabelFontSize: 20,
  currentLabelInset: 20,
  labelFont: "Helvetica",
  labelFontSize: 15,
  labelFormat: numberToFormat => {
    let prefix = d3.formatPrefix(numberToFormat);
    return prefix.scale(numberToFormat) + "" + prefix.symbol.toUpperCase();
  },

  arcColorFn: function(value) {
    let ticks = [
      {
        tick: 0,
        color: "green"
      },
      {
        tick: 25000,
        color: "yellow"
      },
      {
        tick: 50000,
        color: "orange"
      },
      {
        tick: 75000,
        color: "red"
      }
    ];
    let ret;
    ticks.forEach(function(tick) {
      if (value > tick.tick) {
        ret = tick.color;
        return;
      }
    });
    return ret;
  }
};

var oR = config.size - config.arcInset;
var iR = config.size - oR - config.arcWidth;

class Chart extends Component {
  constructor(props) {
    super(props);
    this.svgRef = React.createRef();
    this.arc = d3
      .arc()
      .innerRadius(iR)
      .outerRadius(oR)
      .startAngle(deg2rad(-90));
    this.dTweenCache = angleConstructor(1);
  }

  componentDidMount() {
    this.drawchart();
  }

  componentDidUpdate() {
    this.updateChart();
  }

  drawchart() {
    this.svg = d3
      .select(this.svgRef.current)
      .append("svg")
      .attr("width", config.size)
      .attr("height", config.size)
      .append("g")
      .attr(
        "transform",
        "translate(" + config.size / 2 + "," + config.size / 2 + ")"
      )
      .style("fill", "dimgray");

    // background

    this.svg
      .append("path")
      .datum({
        endAngle: deg2rad(90)
      })
      .attr("class", "gaugeBackground")
      .attr("d", this.arc);

    // foreground

    this.foreground = this.svg
      .append("path")
      .datum({
        endAngle: deg2rad(-90)
      })
      // .style("fill", cur_color)
      .attr("d", this.arc);

    this.current = this.svg
      .append("text")
      .attr(
        "transform",
        "translate(0," + -(-config.currentLabelInset + iR / 4) + ")"
      ) // Push up from center 1/4 of innerRadius
      .attr("text-anchor", "middle")
      .style("font-size", config.currentLabelFontSize)
      .style("font-family", config.labelFont)
      .text(function(d) {
        return d;
      });
  }

  updateChart() {
    var value = this.props.data;
    this.new_color = config.arcColorFn(value);

    var numPi = deg2rad(Math.floor((value * 180) / config.maxValue - 90));

    this.current.transition().text(value);
    this.foreground
      .transition()
      .duration(config.transitionMs)
      .styleTween("fill", function() {
        return d3.interpolate(this.new_color, this.cur_color);
      })
      .attrTween("d", (d, i) => {
        var interpolate = d3.interpolate(this.dTweenCache[i], d);
        this.dTweenCache[i] = d;
        return t => {
          return this.arc(interpolate(t));
        }
      })
      // .call(numPi);

    this.hold = this.cur_color;
    this.cur_color = this.new_color;
    this.new_color = this.hold;

    var arc = this.arc;

    function arcTween(transition, newAngle) {
      transition.attrTween("d", function(d) {
        var interpolate = d3.interpolate(d.endAngle, newAngle);
        return function(t) {
          d.endAngle = interpolate(t);
          return arc(d);
        };
      });
    }
  }

  render() {
    return <svg ref={this.svgRef} />;
  }
}

class GaugeChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: Math.floor(Math.random() * 100)
    };
  }

  componentDidMount() {
    this.dataUpdater();
  }

  componentDidUpdate() {
    this.dataUpdater();
  }

  dataUpdater() {
    var data = Math.floor(Math.random() * 100);
    this.setState({ data });
  }

  shouldComponentUpdate(nextP) {
    if (nextP.lastUpdate === this.props.lastUpdate) {
      return false;
    }
    return true;
  }

  render() {
    return <Chart {...this.state} />;
  }
}
export default GaugeChart;

function deg2rad(deg) {
  return (deg * Math.PI) / 180;
}

const angleConstructor = l => {
  var d = [];
  for (var i = 0; i < l; i++) {
    d.push({ startAngle: 0, endAngle: 0 });
  }
  return d;
};
