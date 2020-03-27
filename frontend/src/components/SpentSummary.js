import React, { Component } from "react";
import { USER_INFO_URL, GET_CATEGORY_BUDGET } from "../constants/Constants";
// import Jumbotron from "react-bootstrap/Jumbotron";
import classes from "./SpentSummary.module.css";
import { DarkModeContext } from "../contexts/DarkModeContext";

import history from "../routing/History";
import { LOGIN_PATH } from "../constants/Constants";

//Imports for pie chart
import { PieChart, Pie, ResponsiveContainer, Sector } from "recharts";

/**
 * This class displays a summary in the form of a pie chart
 * to the user, based on their spent money for the given month.
 *
 * Code snippets from:
 * http://recharts.org/en-US/examples/TwoSimplePieChart
 */
class SpentSummary extends Component {
  state = {
    isLoggedIn: null,
    spentData: null,
    activeIndex: 0
  };

  componentDidMount = () => {
    this.callAuthAPI().catch(err => {
      console.log(err);
    });

    this.callBudgetAPI().catch(err => {
      console.log(err);
    });
  };

  callAuthAPI = async () => {
    console.log(USER_INFO_URL);
    let response;
    response = await fetch(USER_INFO_URL);
    // const body = await response.json();
    // console.log(body.status);

    if (response.status !== 200) {
      // console.log("false");
      this.setState({ isLoggedIn: false });
    } else {
      // console.log("true");
      this.setState({ isLoggedIn: true });
    }
  };

  callBudgetAPI = async () => {
    console.log(GET_CATEGORY_BUDGET);
    let response;
    response = await fetch(GET_CATEGORY_BUDGET);
    const body = await response.json();
    console.log(body);

    let dataArray = [];

    for (let i = 0; i < body.length; i++) {
      if (body[i]["category"] === "Personal Entertainment") {
        body[i]["category"] = "Entertainment";
      }

      dataArray[i] = {
        name: body[i]["category"],
        value: parseInt(body[i]["spent"])
      };
    }

    this.setState({ spentData: dataArray });

    console.log(dataArray);
  };

  renderCategories = () => {
    if (this.state.isLoggedIn == null) return null;

    let categoriesArr = [];

    for (let i = 0; i < this.state.spentData.length; i++) {
      categoriesArr[i] = <p key={i}>{this.state.spentData[i]["name"] + ":"}</p>;
    }

    return <div>{categoriesArr}</div>;
  };

  renderSpending = () => {
    if (this.state.isLoggedIn == null) return null;

    let spendingArr = [];

    for (let i = 0; i < this.state.spentData.length; i++) {
      spendingArr[i] = <p key={i}>{"$" + this.state.spentData[i]["value"]}</p>;
    }

    return <div>{spendingArr}</div>;
  };

  renderActiveShape = props => {
    const RADIAN = Math.PI / 180;
    const {
      cx,
      cy,
      midAngle,
      innerRadius,
      outerRadius,
      startAngle,
      endAngle,
      fill,
      payload,
      percent
    } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? "start" : "end";

    return (
      <g>
        <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
          {payload.name}
        </text>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={outerRadius + 6}
          outerRadius={outerRadius + 10}
          fill={fill}
        />
        <path
          d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
          stroke={fill}
          fill="none"
        />
        <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
        <text
          x={ex + (cos >= 0 ? 1 : -1) * 12}
          y={ey}
          textAnchor={textAnchor}
          fill="#333"
        >{`${this.state.spentData[this.state.activeIndex]["name"]}`}</text>
        <text
          x={ex + (cos >= 0 ? 1 : -1) * 12}
          y={ey}
          dy={18}
          textAnchor={textAnchor}
          fill="#999"
        >
          {`(${(percent * 100).toFixed(2)}%)`}
        </text>
      </g>
    );
  };

  getInitialState = () => {
    return {
      activeIndex: 0
    };
  };

  onPieEnter = (data, index) => {
    this.setState({
      activeIndex: index
    });
  };

  render() {
    if (this.state.isLoggedIn != null && !this.state.isLoggedIn) {
      history.push(LOGIN_PATH);
      return null;
    } else {
      return (
        <div className={classes.contentWrapper}>
          <div className={classes.textWrapper}>
            <div className={classes.headerWrapper}>
              <h1>Spending Summary</h1>
            </div>
            <div className={classes.breakdownDiv}>
              <div className={classes.catDiv}>{this.renderCategories()}</div>
              <div className={classes.numberDiv}>{this.renderSpending()}</div>
            </div>
          </div>
          <div className={classes.chartWrapper}>
            <ResponsiveContainer aspect={1.8} width="100%">
              <PieChart margin={{ top: 20, right: 0, left: 0, bottom: 0 }}>
                <Pie
                  dataKey="value"
                  data={this.state.spentData}
                  innerRadius="45%"
                  outerRadius="90%"
                  cx="50%"
                  fill="#34C759"
                  activeShape={this.renderActiveShape}
                  onMouseEnter={this.onPieEnter}
                  activeIndex={this.state.activeIndex}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      );
    }
  }
}

SpentSummary.contextType = DarkModeContext;
export default SpentSummary;
