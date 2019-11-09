// theme : staff success

import React, { Component } from "react";
import * as d3 from "d3";
import {
  sankey as sankeyFunc,
  sankeyLinkHorizontal,
  sankeyJustify
} from "d3-sankey";

// eslint-disable-next-line
const new_data = {
  name: "Company",
  children: [
    {
      name: "Tech",
      children: [
        {
          id: 1,
          name: "Zeynep",
          position: "Manager",
          value: 3
        },
        {
          id: 2,
          name: "Ahmet",
          position: "Intern",
          value: 25
        },
        {
          id: 3,
          name: "Mehmet",
          position: "Web Developer",
          value: 2
        },
        {
          id: 4,
          name: "Aslı",
          position: "Analyst",
          value: 15
        },
        {
          id: 5,
          name: "Hasan",
          position: "IT",
          value: 1
        }
      ],
      value: 6
    },
    {
      name: "Finance",
      children: [
        {
          id: 6,
          name: "Cem",
          position: "Manager",
          value: 2
        },
        {
          id: 7,
          name: "Ezgi",
          position: "Junior Researcher",
          value: 15
        },
        {
          id: 8,
          name: "Aleyna",
          position: "Accountant",
          value: 2
        },
        {
          id: 9,
          name: "Sinem",
          position: "Investor Relations",
          value: 25
        },
        {
          id: 10,
          name: "Oğuz",
          position: "Analyst",
          value: 2
        }
      ],
      value: 3
    },
    {
      name: "HR",
      children: [
        {
          id: 11,
          name: "Elif",
          position: "Manager",
          value: 4
        },
        {
          id: 12,
          name: "Naz",
          position: "Recruiter",
          value: 5
        },
        {
          id: 13,
          name: "Gamze",
          position: "Analyst",
          value: 5
        },
        {
          id: 14,
          name: "Durmuş",
          position: "Intern",
          value: 1
        },
        {
          id: 15,
          name: "Deniz",
          position: "Workplace Experience Lead",
          value: 2
        }
      ],
      value: 1
    }
  ],
  value: 1
};

const _data = {
  nodes: [
    {
      id: 20,
      name: "Holding"
    },
    {
      id: 1,
      name: "Onur",
      position: "Manager"
    },
    {
      id: 2,
      name: "Ahmet",
      position: "Intern"
    },
    {
      id: 3,
      name: "Mehmet",
      position: "Web Developer"
    },
    {
      id: 4,
      name: "Aslı",
      position: "Analyst"
    },
    {
      id: 5,
      name: "Hasan",
      position: "IT"
    },
    {
      id: 6,
      name: "Cem",
      position: "Manager"
    },
    {
      id: 7,
      name: "Ezgi",
      position: "Junior Researcher"
    },
    {
      id: 8,
      name: "Aleyna",
      position: "Accountant"
    },
    {
      id: 9,
      name: "Sinem",
      position: "Investor Relations"
    },
    {
      id: 10,
      name: "Oğuz",
      position: "Analyst"
    },
    {
      id: 11,
      name: "Elif",
      position: "Manager"
    },
    {
      id: 12,
      name: "Naz",
      position: "Recruiter"
    },
    {
      id: 13,
      name: "Gamze",
      position: "Analyst"
    },
    {
      id: 14,
      name: "Durmuş",
      position: "Intern"
    },
    {
      id: 15,
      name: "Deniz",
      position: "Workplace Experience Lead"
    },
    {
      id: 16,
      name: "Tech"
    },
    {
      id: 17,
      name: "Finance"
    },
    {
      id: 18,
      name: "HR"
    },
    {
      id: 19,
      name: "Company"
    }
  ],
  links: [
    {
      source: 1,
      target: 16,
      value: 0.3
    },
    {
      source: 2,
      target: 16,
      value: 0.25
    },
    {
      source: 3,
      target: 16,
      value: 0.2
    },
    {
      source: 4,
      target: 16,
      value: 0.15
    },
    {
      source: 5,
      target: 16,
      value: 0.1
    },
    
    {
      source: 7,
      target: 17,
      value: 0.15
    },
    {
      source: 8,
      target: 17,
      value: 0.2
    },
    {
      source: 6,
      target: 17,
      value: 0.25
    },{
      source: 9,
      target: 17,
      value: 0.2
    },
    {
      source: 10,
      target: 17,
      value: 0.2
    },
    {
      source: 11,
      target: 18,
      value: 0.4
    },
    {
      source: 12,
      target: 18,
      value: 0.05
    },
    {
      source: 13,
      target: 18,
      value: 0.05
    },
    {
      source: 14,
      target: 18,
      value: 0.1
    },
    {
      source: 15,
      target: 18,
      value: 0.2
    },
    {
      source: 16,
      target: 19,
      value: 0.3
    },
    {
      source: 17,
      target: 19,
      value: 0.5
    },
    {
      source: 18,
      target: 19,
      value: 0.2
    },
    {
      source: 16,
      target: 20,
      value: 0.5
    }
  ]
};

class Chart extends Component {
  constructor(props) {
    super(props);
    this.svgRef = React.createRef();
    this.state = {
      text: false
    };
  }

  componentDidMount() {
    const { data } = this.props;

    this.svg = d3.select(this.svgRef.current);

    const sankey = sankeyFunc()
      // .size([400, 400])
      .extent([[0, 0], [300, 500]])
      .nodeId(d => {
        return d.id;
      })
      .nodeWidth(5)
      .nodePadding(10)
      .nodeAlign(sankeyJustify)
      .nodeSort((a, b) => {
        if (
          a.sourceLinks[0] &&
          b.sourceLinks[0] &&
          a.sourceLinks[0].target === b.sourceLinks[0].target
        ) {
          return b.value - a.value;
        }
      });

    const sankeyWData = sankey(data);
    console.log(sankeyWData);

    this.links = this.svg
      .append("g")
      .selectAll("path")
      .data(sankeyWData.links)
      .join("path")
      .attr("class", "link")
      .attr("d", sankeyLinkHorizontal())
      .attr("fill", "none")
      .attr("stroke", "#606060")
      .attr("stroke-width", d => d.width)
      .attr("stroke-opacity", 0.5)
      .attr("id", (d, i) => `link-${i}`)
      .on("mouseover", d => {
        var text = `${d.source.name}--${d.target.name} --> ${d.value}`;
        this.setState({ text });
      })
      .on("mouseout", d => {
        this.setState({ text: false });
      });

    this.nodeGroups = this.svg
      .append("g")
      .selectAll("path")
      .data(sankeyWData.nodes)
      .join("g")
      .attr("transform", d => `translate(${d.x0}, ${d.y0})`);

    this.nodes = this.nodeGroups
      .append("rect")
      .attr("width", d => d.x1 - d.x0)
      .attr("height", d => d.y1 - d.y0)
      .attr("fill", "blue")
      .attr("opacity", 0.8);

    this.texts = this.nodeGroups
      .append("text")
      .attr("transform", d => {
        return `translate(${5 + 1},${(d.y1 - d.y0) / 2 + 2})`;
      })
      .attr("text-anchor", "start")
      .style("user-select", "none")
      .style("fill", "dimgray")
      .style("font-size", 10)
      .text(d => d.name);
  }

  render() {
    return (
      <div>
        <svg width={300} height={500} ref={this.svgRef} />
        <div>
          <p style={{textAlign: 'center', margin: '10px auto'}}>
            {this.state.text
              ? this.state.text
              : "Tip : Hover or tap on links to examine values"}
          </p>
        </div>
      </div>
    );
  }
}

class SankeyChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: _data
    };
  }

  render() {
    return <Chart data={this.state.data} />;
  }
}
export default SankeyChart;

// function getAllNodes(sdata) {
//   var cdata = sdata.targetLinks;
//   var alldata = [];
//   for (var i = 0; i < sdata.height; i++) {

//   }
// }
