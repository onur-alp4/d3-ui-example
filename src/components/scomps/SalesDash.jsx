import React, { Component } from "react";
import BarChart from "./salesCharts/BarChart";
import PieChart from "./salesCharts/PieChart";

import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";

import Cancel from "@material-ui/icons/Cancel";

import "./salesDash.css";
import { ChevronLeft, ChevronRight } from "@material-ui/icons";

const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday"
];

const items = [
  "Pizza",
  "Burger",
  "Sushi",
  "Fish",
  "Salad",
  "Sandwich",
  "Kebab"
];

const paperStyles = {
  transform: "scale(0.8)",
  overflow: "hidden",
  padding: "10px",
  minWidth: "350px",
  maxWidth: "375px",
  minHeight: "350px"
};

class SalesDash extends Component {
  constructor(props) {
    super(props);
    this.barData = mockDataApi(100).barData;
    this.state = {
      barData: this.barData,
      pieData: mockDataApi(100).pieData,
      currentSelection: null,
      lastUpdate: Date.now()
    };
  }

  componentDidMount() {
    this.dataUpdater();
    this.timer = setInterval(() => {
      var cd = this.state.cd + 1;
      this.setState({ cd });
    }, 1000 * 60);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  dataUpdater() {
    var date = Date.now();
    let data = mockDataApi(100);
    this.barData = data.barData;
    this.setState({ lastUpdate: date, ...data, currentSelection: null, cd: 0 });
    this.resetSelection();
  }

  changeItem(a) {
    var _data = this.state.pieData;
    var i = _data.findIndex(e => {
      return e.label === a.data.label;
    });
    var nState = {};
    nState.barData = _data[i].days;
    nState.currentSelection = { label: a.data.label, index: a.index };
    this.setState({ ...nState });
  }

  resetSelection() {
    this.setState({ currentSelection: null, barData: this.barData });
  }

  render() {
    // eslint-disable-next-line
    const { lastUpdate, barData, pieData, currentSelection } = this.state;
    return (
      <div
        className=''
      >
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
            margin: "auto",
            position: "relative",
            top: 20
          }}
        >
          <span>
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
          </span>
          <span
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              justifyContent: "center",
              position: "relative"
            }}
          >
            <span style={{ display: "flex", alignItems: "center" }}>
              <span>Current Selection:</span>
              {currentSelection ? (
                <span style={{ display: "flex", flexDirection: "row" }}>
                  <span
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center"
                    }}
                  >{`  ${currentSelection.label} Sales  `}</span>
                  <span style={{ display: "flex" }}>
                    <IconButton
                      style={{ padding: "0px 5px" }}
                      onClick={() => {
                        this.resetSelection();
                      }}
                    >
                      <Cancel style={{ fontSize: 15 }} />
                    </IconButton>
                  </span>
                </span>
              ) : (
                <span>Total Sales</span>
              )}
            </span>
            <span style={{ margin: "6.5px 0px" }}>
              <span>{lastUpdate && `Last Update:`}</span>
              <span>
                {lastUpdate || lastUpdate === 0
                  ? `just now`
                  : `${this.state.cd} mins ago`}
              </span>
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
              Daily Sales
            </Typography>
            <BarChart data={barData} />
          </Paper>
          <Paper className="chartCard" style={paperStyles}>
            <Typography
              variant="h6"
              style={{ textAlign: "center", marginTop: 15 }}
            >
              Sales by Item Type
            </Typography>
            <PieChart
              data={pieData}
              currentSelection={currentSelection}
              onclick={a => {
                this.changeItem(a);
              }}
            />
            <div>
              <Typography variant="caption">
                Tip: Click on any slice to visualize daily sales of related
                category
              </Typography>
            </div>
          </Paper>
        </div>
      </div>
    );
  }
}
export default SalesDash;

function rndmData(max) {
  return Math.floor(Math.random() * max);
}

function mockDataApi(max) {
  var pieData = [];
  var barData = [];
  items.forEach((item, i) => {
    var _item = {
      label: item,
      value: 0,
      days: []
    };
    days.forEach((day, j) => {
      // for itemBased
      var _val = rndmData(max);
      var _iday = { label: day, value: _val };
      _item.value += _val;
      _item.days.push(_iday);
      // for barData
      if (i === 0) {
        var _day = { label: day, value: 0 };
        barData.push(_day);
      }
      barData[j].value += _val;
    });
    pieData.push(_item);
  });
  return { pieData, barData };
}
