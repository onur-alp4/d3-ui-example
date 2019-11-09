import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

import Nav from "./scomps/Nav";
import SalesDash from "./scomps/SalesDash";
import AppDash from "./scomps/AppDash";
import Home from "./scomps/Home";

import {
  Drawer,
  AppBar,
  Toolbar,
  IconButton,
  Typography
} from "@material-ui/core";

import { Menu as MenuIcon, AccountCircle } from "@material-ui/icons";

class Bi extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMenuOpen: false,
      isMenuClicked: false,
      header: "Home"
    };
  }

  closeMenu(header) {
    header = header === "c" ? this.state.header : header;
    this.setState({ isMenuOpen: false, header });
  }

  render() {
    return (
      <div className="full-h">
        <Drawer
          open={this.state.isMenuOpen}
          onClose={() => {
            this.setState({ isMenuOpen: false });
          }}
        >
          <Nav
            onClick={d => {
              this.closeMenu(d);
            }}
          />
        </Drawer>
        <div
          className="full-h"
          style={{ backgroundColor: "rgb(245, 245, 245)", paddingTop: 30 , boxSizing: 'border-box'}}
        >
          <AppBar
            style={{
              color: "#757575",
              backgroundColor: "white",
              maxWidth: "90%",
              margin: "10px auto"
            }}
            position="static"
          >
            <Toolbar
              style={{
                display: "flex",
                alignItems: "center",
                flexDirection: "row",
                justifyContent: "space-between"
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center"
                }}
              >
                <IconButton
                  edge="start"
                  // className={this.state.isMenuClicked ? '' : 'mbanim'}
                  onClick={() => {
                    this.setState({ isMenuOpen: true, isMenuClicked: true });
                  }}
                >
                  <MenuIcon />
                </IconButton>
                <Typography variant="h6">
                  {this.state.header && this.state.header}
                </Typography>
              </div>
              <div>
                <IconButton>
                  <AccountCircle />
                </IconButton>
              </div>
            </Toolbar>
          </AppBar>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/SalesDash" component={SalesDash} />
            <Route path="/AppDash" component={AppDash} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default Bi;
