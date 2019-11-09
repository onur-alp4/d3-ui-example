import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

const SalesDash = [
  "Single Page Web App developed to demonstrate React and D3.js capabilities.",
  "-Front-End: React, react-router-dom, D3.js, @material-ui for theming",
  "-Back-End: Firebase Hosting"
];

const AppDash = [
  "",
  ""
]

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="full-h">
        <Card style={{ margin: "30px auto", maxWidth: 785 }}>
          <CardContent>
            <Typography variant="h6" style={{ fontWeight: "bold" }}>
              Charts with Interactive Selection
            </Typography>
            <a href="./salesDash">
              Sales Charts
            </a>
          </CardContent>
        </Card>
        <Card style={{ margin: "30px auto", maxWidth: 785 }}>
          <CardContent>
            <Typography variant="h6" style={{ fontWeight: "bold" }}>
              Classic charts
            </Typography>
            <a href='./appDash'>
              App Charts
            </a>
          </CardContent>
        </Card>
      </div>
    );
  }
}

export default Home;
