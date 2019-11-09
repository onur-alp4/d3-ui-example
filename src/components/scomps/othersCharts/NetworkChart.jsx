import React, { Component } from "react";
import * as d3 from "d3";

// var margin = { top: 10, right: 30, bottom: 30, left: 40 },
const width = 400;
const height = 400;

// eslint-disable-next-line
const old_data = {
  nodes: [
    {
      id: 1,
      name: "Hamburger",
      value: 5
    },
    {
      id: 2,
      name: "Buns",
      value: 2
    },
    {
      id: 21,
      name: "Top Bun",
      value: 1
    },
    {
      id: 22,
      name: "Bottom Bun",
      value: 1
    },
    {
      id: 200,
      name: "Water",
      value: 4
    },
    {
      id: 201,
      name: "Butter",
      value: 1
    },
    {
      id: 202,
      name: "Egg(Large)",
      value: 2
    },
    {
      id: 203,
      name: "Flour",
      value: 3
    },
    {
      id: 204,
      name: "Sugar",
      value: 2
    },
    {
      id: 205,
      name: "Sugar",
      value: 2
    },
    {
      id: 206,
      name: "Salt",
      value: 1
    },
    {
      id: 207,
      name: "Instant Yeast",
      value: 1
    },
    {
      id: 3,
      name: "Patty",
      value: 2
    },
    {
      id: 30,
      name: "Ground Beef",
      value: 5
    },
    {
      id: 31,
      name: "Minced Onion",
      value: 1
    },
    {
      id: 32,
      name: "Minced Garlic",
      value: 1
    },
    {
      id: 33,
      name: "Pepper",
      value: 1
    },
    {
      id: 4,
      name: "Tomato",
      value: 2
    },
    {
      id: 5,
      name: "Lettuce",
      value: 1
    },
    {
      id: 6,
      name: "Pickles",
      value: 3
    },
    {
      id: 7,
      name: "Cheese",
      value: 1
    },
    {
      id: 8,
      name: "Mayonnaise",
      value: 1
    }
  ],
  links: [
    { source: 1, target: 2 },
    { source: 1, target: 3 },
    { source: 1, target: 4 },
    { source: 1, target: 5 },
    { source: 1, target: 6 },
    { source: 1, target: 7 },
    { source: 2, target: 21 },
    { source: 2, target: 22 },
    { source: 21, target: 200 },
    { source: 21, target: 201 },
    { source: 21, target: 202 },
    { source: 21, target: 203 },
    { source: 21, target: 204 },
    { source: 21, target: 206 },
    { source: 21, target: 207 },
    { source: 22, target: 200 },
    { source: 22, target: 201 },
    { source: 22, target: 202 },
    { source: 22, target: 203 },
    { source: 22, target: 204 },
    { source: 22, target: 206 },
    { source: 22, target: 207 },
    { source: 3, target: 30 },
    { source: 3, target: 31 },
    { source: 3, target: 32 },
    { source: 3, target: 33 }
  ]
};

const _data = {
  name: "Hamburger",
  children: [
    {
      name: "Buns",
      children: [
        {
          id: 201,
          name: "Butter",
          value: 1
        },
        {
          id: 202,
          name: "Egg(Large)",
          value: 2
        },
        {
          id: 203,
          name: "Flour",
          value: 3
        },
        {
          id: 204,
          name: "Sugar",
          value: 2
        },
        {
          id: 205,
          name: "Sugar",
          value: 2
        },
        {
          id: 206,
          name: "Salt",
          value: 1
        },
        {
          id: 207,
          name: "Instant Yeast",
          value: 1
        }
      ],
      value: 2
    },
    {
      name: "Patty",
      children: [
        {
          id: 30,
          name: "Ground Beef",
          value: 5
        },
        {
          id: 31,
          name: "Minced Onion",
          value: 1
        },
        {
          id: 32,
          name: "Minced Garlic",
          value: 1
        },
        {
          id: 33,
          name: "Pepper",
          value: 1
        }
      ],
      value: "2"
    },
    {
      id: 4,
      name: "Tomato",
      value: 2
    },
    {
      id: 5,
      name: "Lettuce",
      value: 1
    },
    {
      id: 6,
      name: "Pickles",
      value: 3
    },
    {
      id: 7,
      name: "Cheese",
      value: 1
    },
    {
      id: 8,
      name: "Mayonnaise",
      value: 1
    }
  ],
  value: 5
};

// eslint-disable-next-line
const other_data = {
  name: "Company",
  children: [
    {
      name: "Tech",
      children: [
        {
          id: 1,
          name: "Onur",
          position: "Manager",
          value: 0.3
        },
        {
          id: 2,
          name: "Ahmet",
          position: "Intern",
          value: 0.25
        },
        {
          id: 3,
          name: "Mehmet",
          position: "Web Developer",
          value: 0.2
        },
        {
          id: 4,
          name: "Aslı",
          position: "Analyst",
          value: 0.15
        },
        {
          id: 5,
          name: "Hasan",
          position: "IT",
          value: 0.1
        }
      ],
      value: 0.6
    },
    {
      name: "Finance",
      children: [
        {
          id: 6,
          name: "Cem",
          position: "Manager",
          value: 0.2
        },
        {
          id: 7,
          name: "Ezgi",
          position: "Junior Researcher",
          value: 0.15
        },
        {
          id: 8,
          name: "Aleyna",
          position: "Accountant",
          value: 0.2
        },
        {
          id: 9,
          name: "Sinem",
          position: "Investor Relations",
          value: 0.25
        },
        {
          id: 10,
          name: "Oğuz",
          position: "Analyst",
          value: 0.2
        }
      ],
      value: 0.3
    },
    {
      name: "HR",
      children: [
        {
          id: 11,
          name: "Elif",
          position: "Manager",
          value: 0.4
        },
        {
          id: 12,
          name: "Naz",
          position: "Recruiter",
          value: 0.05
        },
        {
          id: 13,
          name: "Gamze",
          position: "Analyst",
          value: 0.05
        },
        {
          id: 14,
          name: "Durmuş",
          position: "Intern",
          value: 0.1
        },
        {
          id: 15,
          name: "Deniz",
          position: "Workplace Experience Lead",
          value: 0.2
        }
      ],
      value: 0.1
    }
  ],
  value: 0.1
};

class Chart extends Component {
  constructor(props) {
    super(props);
    this.svgRef = React.createRef();
    this.state = {};
  }
  componentDidMount() {
    this.drawChart();
  }

  drawChart() {
    const root = d3.hierarchy(this.props.data);
    const links = root.links();
    const nodes = root.descendants();

    const simulation = d3
      .forceSimulation(nodes)
      .force(
        "link",
        d3
          .forceLink(links)
          .id(d => d.id)
          .distance(0)
          .strength(1)
      )
      .force("charge", d3.forceManyBody().strength(-500))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force("x", d3.forceX())
      .force("y", d3.forceY());

    this.delem = d3.select(this.svgRef.current);

    this.links = this.delem
      .append("g")
      .attr("stroke", "#999")
      .attr("stroke-opacity", 0.6)
      .selectAll("line")
      .data(links)
      .join("line");

    const drag = simulation => {
      function dragstarted(d) {
        if (!d3.event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
      }

      function dragged(d) {
        d.fx = d3.event.x;
        d.fy = d3.event.y;
      }

      function dragended(d) {
        if (!d3.event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
      }

      return d3
        .drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended);
    };

    this.nodeGroups = this.delem
      .append("g")
      .selectAll("circle")
      .data(nodes)
      .join("g");

    this.nodes = this.nodeGroups
      .append("circle")
      .merge(this.nodeGroups.select("circle"));

    this.nodes
      .attr("fill", "#000")
      .attr("stroke", "#fff")
      .attr("r", d => {
        return d.data.value * 2;
      });

    this.text = this.nodeGroups
      .append("text")
      .merge(this.nodeGroups.select("text"));

    this.text
      .attr("text-anchor", "middle")
      .attr("alignment-baseline", "middle")
      .style("user-select", "none")
      .style("fill", "dimgray")
      .style("font-size", 10)
      .text(d => d.data.name);

    this.nodeGroups.call(drag(simulation));

    simulation.on("tick", () => {
      this.links
        .attr("x1", d => d.source.x)
        .attr("y1", d => d.source.y)
        .attr("x2", d => d.target.x)
        .attr("y2", d => d.target.y);

      // this.nodes.attr("cx", d => d.x).attr("cy", d => d.y);
      this.nodeGroups.attr("transform", d => `translate(${d.x}, ${d.y})`);
    });
  }

  render() {
    return (
      <div>
        <svg
          ref={this.svgRef}
          width={400}
          height={400}
          // transform={"translate(" + margin.left + "," + margin.top + ")"}
        />
        <div>
          <p style={{ textAlign: "center", margin: "10px auto" }}>
            Tip: Try to drag nodes
          </p>
        </div>
      </div>
    );
  }
}

class NetworkChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: _data
    };
  }

  render() {
    return (
      <div>
        <Chart data={this.state.data} />
      </div>
    );
  }
}
export default NetworkChart;
