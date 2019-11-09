import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Bi from "./components/Bi";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" component={Bi} />
        </Switch>
      </BrowserRouter>
    );
  }
}
export default App;
