import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";

import StreamGraph from "./appCharts/StreamGraph";
import DonutChart from "./appCharts/DonutChart";
import ScatterPlot3Dim from "./appCharts/ScatterPlot3Dim";

import { ChevronLeft, ChevronRight } from "@material-ui/icons";

import ReactSpeedometer from "react-d3-speedometer";
import NetworkChart from "./othersCharts/NetworkChart";
import SankeyChart from "./othersCharts/SankeyChart";

const paperStyles = {
  transform: "scale(0.8)",
  overflow: "hidden",
  padding: "10px",
  minWidth: "350px",
  maxWidth: "375px",
  minHeight: "350px"
};

const gaugeConfig = {
  maxValue: 100,
  width: 300,
  height: 150,
  needleTransition: "easeCubicOut",
  needleHeightRatio: 0.7,
  customSegmentStops: [0, 20, 40, 100],
  segmentColors: ["#d62728", "#ff7f0e", "#2ca02c"]
};

class AppDash extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gData: Math.floor(Math.random() * 90 + 10)
    };
  }

  componentDidMount() {
    this.dataUpdater();
    this.timer = setInterval(() => {
      var cd = this.state.cd + 1;
      this.setState({ cd });
    }, 1000 * 60);
  }

  dataUpdater() {
    var date = Date.now();
    var gData = Math.floor(Math.random() * 90 + 10);
    this.setState({ lastUpdate: date, cd: 0, gData });
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    const { lastUpdate } = this.state;
    return (
      <div className="appDash-main" style={{ backgroundColor: "rgb(245, 245, 245)"}}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            width: "90%",
            maxWidth: "720px",
            padding: 10,
            margin: "auto",position: "relative",
            top: 15
          }}
        >
          <span
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center"
            }}
          >
            <span>Change week</span>
            <span>
              <IconButton
                style={{ padding: "5px 12px" }}
                onClick={() => {
                  this.dataUpdater();
                }}
              >
                <ChevronLeft />
              </IconButton>
              <IconButton
                style={{ padding: "5px 12px" }}
                onClick={() => {
                  this.dataUpdater();
                }}
              >
                <ChevronRight />
              </IconButton>
            </span>
          </span>
          <span style={{ margin: "6.5px 0px" }}>
            <span>{lastUpdate && `Last Update:`}</span>
            <span>
              {lastUpdate || lastUpdate === 0
                ? `just now`
                : `${this.state.cd} mins ago`}
            </span>
          </span>
        </div>

        {/* Charts Main */}
        <div
          className="chartList"
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center"
          }}
        >
          <Paper className="chartCard" style={paperStyles}>
            <Typography
              variant="h6"
              style={{ textAlign: "center", marginTop: 15 }}
            >
              Google Play Reviews
            </Typography>
            <DonutChart lastUpdate={lastUpdate} />
          </Paper>
          <Paper className="chartCard" style={paperStyles}>
            <Typography
              variant="h6"
              style={{ textAlign: "center", marginTop: 15 }}
            >
              Rate of Weekly Active Users
            </Typography>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                height: "100%",
                alignItems: 'center',
                position: 'relative',
                top: -50
              }}
            >
              <ReactSpeedometer {...gaugeConfig} value={this.state.gData} />
            </div>
          </Paper>

          <Paper className="chartCard" style={paperStyles}>
            <Typography
              variant="h6"
              style={{ textAlign: "center", marginTop: 15 }}
            >
              Daily visits
            </Typography>
            <StreamGraph lastUpdate={lastUpdate} />
          </Paper>
          <Paper className="chartCard" style={paperStyles}>
            <Typography
              variant="h6"
              style={{ textAlign: "center", marginTop: 15 }}
            >
              Server Allocation
            </Typography>
            <ScatterPlot3Dim lastUpdate={lastUpdate} />
          </Paper>
          <Paper className="chartCard" style={paperStyles}>
            <Typography
              variant="h6"
              style={{ textAlign: "center", marginTop: 15 }}
            >
              Network Chart
            </Typography>
            <NetworkChart lastUpdate={lastUpdate} />
          </Paper>
          <Paper className="chartCard" style={paperStyles}>
            <Typography
              variant="h6"
              style={{ textAlign: "center", marginTop: 15 }}
            >
              Sankey Diagram
            </Typography>
            <SankeyChart lastUpdate={lastUpdate} />
          </Paper>
        </div>
      </div>
    );
  }
}
export default AppDash;
