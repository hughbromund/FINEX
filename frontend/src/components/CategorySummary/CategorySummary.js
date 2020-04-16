import React, { Component } from "react";
import history from "../../routing/History";
import {
  LOGIN_PATH,
  USER_INFO_URL,
  CATEGORY_DATA_URL,
  GREEN_COLOR_HEX,
} from "../../constants/Constants";
import { ToggleButton, ToggleButtonGroup, Jumbotron } from "react-bootstrap";
import classes from "./CategorySummary.module.css";
import { DarkModeContext } from "../../contexts/DarkModeContext";

//Imports for pie chart
import { PieChart, Pie, ResponsiveContainer, Sector } from "recharts";

class CategorySummary extends Component {
  state = {
    isLoggedIn: null,
    activeIndex: 0,
    isDataEmpty: false,
    currCat: "Housing",
    data: [],
  };

  /**
   * Perform initial operations and load data
   */
  componentDidMount = () => {
    this.callAuthAPI().catch((err) => {
      console.log(err);
    });

    this.callBudgetAPI(this.state.currCat).catch((err) => {
      console.log(err);
    });
  };

  /**
   * Check if the user is logged in when accessing this page
   */
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

  callBudgetAPI = async (cat) => {
    console.log(CATEGORY_DATA_URL + cat);
    let response;
    response = await fetch(CATEGORY_DATA_URL + cat);
    const body = await response.json();
    console.log(body);

    this.setState({ data: body });
  };

  /**
   * Renders toggle buttons at top of the page
   */
  renderToggles = () => {
    let cats = [
      "Housing",
      "Utilities",
      "Transportation",
      "Food",
      "Medical",
      "Savings",
      "Personal",
      "Entertainment",
      "Other",
    ];

    let buttonsArr = [];

    for (let i = 0; i < cats.length; i++) {
      buttonsArr.push(
        <ToggleButton
          key={i}
          variant="success"
          value={cats[i]}
          onClick={() => {
            this.handleToggle(cats[i].toLowerCase());
          }}
        >
          {cats[i]}
        </ToggleButton>
      );
    }

    return (
      <ToggleButtonGroup type="radio" name="options" defaultValue={"Housing"}>
        {buttonsArr}
      </ToggleButtonGroup>
    );
  };

  renderTitles = () => {
    let titleArr = [];

    for (let i = 0; i < this.state.data.length; i++) {
      titleArr.push(<p key={i}>{this.state.data[i]["name"]}</p>);
    }

    return <div className={classes.titlesWrapper}>{titleArr}</div>;
  };

  renderAmounts = () => {
    let amountArr = [];

    for (let i = 0; i < this.state.data.length; i++) {
      amountArr.push(
        <p key={i}>{"$" + this.state.data[i]["cost"].toFixed(2)}</p>
      );
    }

    return <div className={classes.amountsWrapper}>{amountArr}</div>;
  };

  /**
   * Handle click of toggle button by changing state and
   * updating data
   */
  handleToggle = (cat) => {
    this.setState({ currCat: cat });
    this.callBudgetAPI(cat);
  };

  renderActiveShape = (props) => {
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
      percent,
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
        >{`${this.state.data[this.state.activeIndex]["name"]}`}</text>
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

  onPieEnter = (data, index) => {
    this.setState({
      activeIndex: index,
    });
  };

  render() {
    const toggles = (
      <div key="toggle" className={classes.toggleGroupWrapper}>
        {this.renderToggles()}
      </div>
    );

    if (this.state.isLoggedIn != null && !this.state.isLoggedIn) {
      history.push(LOGIN_PATH);
      return null;
    } else if (this.state.isLoggedIn == null) {
      return <h1>Loading...</h1>;
    } else if (this.state.data.length == 0) {
      return (
        <div>
          {toggles}
          <div key="jumbo" className={classes.jumboWrapper}>
            <Jumbotron
              className={this.context.isDarkMode ? "bg-dark" : "bg-light"}
            >
              <h1>No Category Spending</h1>
              <p>Try again when you have spent some money in this category</p>
            </Jumbotron>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          {toggles}
          <div key="content" className={classes.contentWrapper}>
            <div className={classes.textWrapper}>
              <div className={classes.headerWrapper}>
                <h1> Summary </h1>
              </div>
              <div className={classes.breakdownDiv}>
                {this.renderTitles()}
                {this.renderAmounts()}
              </div>
            </div>
            <div className={classes.chartWrapper}>
              <ResponsiveContainer aspect={1.8} width="100%">
                <PieChart margin={{ top: 20, right: 0, left: 0, bottom: 20 }}>
                  <Pie
                    dataKey="cost"
                    data={this.state.data}
                    innerRadius="40%"
                    outerRadius="80%"
                    cx="50%"
                    fill={GREEN_COLOR_HEX}
                    activeShape={this.renderActiveShape}
                    onMouseEnter={this.onPieEnter}
                    activeIndex={this.state.activeIndex}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      );
    }
  }
}

CategorySummary.contextType = DarkModeContext;
export default CategorySummary;
