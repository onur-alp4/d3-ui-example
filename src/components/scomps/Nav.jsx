import React, { Component } from "react";

import { NavLink } from "react-router-dom";

import List from "@material-ui/core/List";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import IconButton from "@material-ui/core/IconButton";

import AttachMoney from "@material-ui/icons/AttachMoney";
import StayPrimaryPortrait from "@material-ui/icons/StayPrimaryPortrait";
import Close from "@material-ui/icons/Close";

import {
  ListItemAvatar,
  Avatar,
  Divider
} from "@material-ui/core";

var routes = [
  {
    to: "AppDash",
    icon: <StayPrimaryPortrait />,
    text: "Platform Usage",
    secText: 'D3js Dashboard Sample'
  },
  {
    to: "SalesDash",
    icon: <AttachMoney />,
    text: "Sales",
    secText: 'D3js Dashboard Sample'
  }
];

var navLinkStyle = {
  padding: "8px 16px",
  flexDirection: "row",
  alignItems: "center",
  display: "flex",
  width: "100%",
  color: "#000000d1",
  textDecoration: "none"
};

var selectedNav = {
  color: "#3f51b5"
};

class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "100%"
        }}
      >
        <div style={{ marginTop: 25 }}>
          {/* <IconButton
          style={{marginLeft:5}}
            onClick={() => {
              this.props.onClick("c");
            }}
          >
            <Close />
          </IconButton> */}

          <List>
            <ListItem
              divider
              style={{
                display: "flex",
                flexDirection: "row",
                margin: 0,
                padding: 0
              }}
            >
              <IconButton
          style={{marginLeft:5}}
                onClick={() => {
                  this.props.onClick("c");
                }}
              >
                <Close />
              </IconButton>
              <ListItemText primary="Portfolio" />
            </ListItem>
            {/* <ListItem style={{ margin: 0, padding: 0 }}>
              <NavLink
                to={`/bi`}
                exact
                style={navLinkStyle}
                activeStyle={selectedNav}
                onClick={() => {
                  this.props.onClick("Home");
                }}
              >
                <ListItemIcon style={{ minWidth: 0, marginRight: 3 }}>
                  <Home />
                </ListItemIcon>
                <ListItemText
                  primary="Prior Works"
                  secondary="from last 6 months"
                />
              </NavLink>
            </ListItem> */}
            {routes.map(e => {
              return (
                <ListItem style={{ margin: 0, padding: 0 }} key={e.to}>
                  <NavLink
                    to={`./${e.to}`}
                    style={navLinkStyle}
                    activeStyle={selectedNav}
                    onClick={() => {
                      this.props.onClick(e.text);
                    }}
                  >
                    <ListItemIcon style={{ minWidth: 0, marginRight: 3 }}>
                      {e.icon}
                    </ListItemIcon>
                    <ListItemText primary={e.text} secondary={e.secText}/>
                  </NavLink>
                </ListItem>
              );
            })}
          </List>
        </div>
        <div>
          <List>
            <Divider />
            <ListItem>
              <a style={navLinkStyle} href='/'>
                <ListItemAvatar>
                  <Avatar
                    alt="home"
                    src="https://firebasestorage.googleapis.com/v0/b/oddarbaz.appspot.com/o/data-visualization-thumb1.jpg?alt=media&token=837d2fd3-d77b-4d41-a880-935e9c4153f8"
                  />
                </ListItemAvatar>
                <ListItemText
                  primary="Go back"
                  secondary="to oddarbaz.web.app"
                />
              </a>
            </ListItem>
          </List>
        </div>
      </div>
    );
  }
}
export default Nav;
