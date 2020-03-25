// Code from example on https://codesandbox.io/s/github/rrag/react-stockcharts-examples2/tree/master/examples/LineAndScatterChartGrid

import React from "react";
import PropTypes from "prop-types";

import { format } from "d3-format";
import { timeFormat } from "d3-time-format";

import { ChartCanvas, Chart } from "react-stockcharts";
import { LineSeries, AreaSeries } from "react-stockcharts/lib/series";

import { XAxis, YAxis } from "react-stockcharts/lib/axes";
import {
  CrossHairCursor,
  MouseCoordinateX,
  MouseCoordinateY
} from "react-stockcharts/lib/coordinates";

import { discontinuousTimeScaleProvider } from "react-stockcharts/lib/scale";
import { OHLCTooltip } from "react-stockcharts/lib/tooltip";
import { fitWidth } from "react-stockcharts/lib/helper";
import { last } from "react-stockcharts/lib/utils";

import { GET_GOOD_COLOR, GET_BAD_COLOR } from "../../constants/Constants";

import { DarkModeContext } from "../../contexts/DarkModeContext";
import classes from "./StockChart.module.css";

class LineAndScatterChartGrid extends React.Component {
  state = {
    goodColor: "",
    badColor: ""
  };

  async getColors() {
    var response = await fetch(GET_GOOD_COLOR, {
      method: "GET",
      withCredentials: true
    });
    const goodColorBody = await response.json();

    var response = await fetch(GET_BAD_COLOR, {
      method: "GET",
      withCredentials: true
    });
    const badColorBody = await response.json();

    this.setState({
      goodColor: goodColorBody.good_color,
      badColor: badColorBody.bad_color
    });
    // fetch(GET_GOOD_COLOR, {
    //   method: "GET",
    //   withCredentials: true
    // }).then(res =>
    //   this.setState({
    //     goodColor: res.json().good_color
    //   })
    // );
    // fetch(GET_BAD_COLOR, {
    //   method: "GET",
    //   withCredentials: true
    // }).then(res =>
    //   this.setState({
    //     badColor: res.json().bad_color
    //   })
    // );
  }

  async componentDidMount() {
    await this.getColors();
    console.log(this.context.isDarkMode);
  }

  render() {
    const { type, data: initialData, width, ratio, interpolation } = this.props;
    const { gridProps, seriesType } = this.props;
    const margin = { left: 70, right: 70, top: 20, bottom: 30 };

    const height = 400;
    const gridHeight = height - margin.top - margin.bottom;
    const gridWidth = width - margin.left - margin.right;

    const showGrid = true;
    const yGrid = showGrid ? { innerTickSize: -1 * gridWidth } : {};
    const xGrid = showGrid ? { innerTickSize: -1 * gridHeight } : {};

    const xScaleProvider = discontinuousTimeScaleProvider.inputDateAccessor(
      d => d.date
    );
    const { data, xScale, xAccessor, displayXAccessor } = xScaleProvider(
      initialData
    );

    const start = xAccessor(last(data));
    const end = xAccessor(data[Math.max(0, data.length - 150)]);
    const xExtents = [start, end];

    const Series = seriesType === "line" ? LineSeries : AreaSeries;
    console.log(
      data[data.length - 1]["close"] - data[data.length - 2]["close"]
    );
    console.log(this.state.goodColor);
    console.log(this.state.badColor);
    return (
      <ChartCanvas
        height={height}
        ratio={ratio}
        width={width}
        margin={{ left: 80, right: 80, top: 10, bottom: 30 }}
        type={type}
        seriesName="MSFT"
        data={data}
        xScale={xScale}
        xAccessor={xAccessor}
        displayXAccessor={displayXAccessor}
        xExtents={xExtents}
        mouseMoveEvent={true}
        panEvent={false}
        zoomEvent={true}
        clamp={true}
      >
        <Chart
          id={1}
          yExtents={d => [Math.max(d.high, d.low), Math.min(d.high, d.low)]}
        >
          <XAxis
            axisAt="bottom"
            orient="bottom"
            {...gridProps}
            {...xGrid}
            tickStroke={this.context.isDarkMode ? "white" : ""}
          />
          <YAxis
            axisAt="right"
            orient="right"
            ticks={5}
            {...gridProps}
            {...yGrid}
            tickStroke={this.context.isDarkMode ? "white" : ""}
          />
          <MouseCoordinateX
            at="bottom"
            orient="bottom"
            displayFormat={timeFormat("%Y-%m-%d")}
          />
          <MouseCoordinateY
            at="right"
            orient="right"
            displayFormat={format(".2f")}
          />

          <Series
            yAccessor={d => d.close}
            interpolation={interpolation}
            stroke="#ff0000" // This is where we can essentially change the color
            fill={
              data[data.length - 1]["close"] - data[data.length - 2]["close"] >
              0
                ? this.state.goodColor
                : this.state.badColor
            }
          />
          <OHLCTooltip
            origin={[-40, 0]}
            textFill={this.context.isDarkMode ? "white" : ""}
          />
        </Chart>

        <CrossHairCursor />
      </ChartCanvas>
    );
  }
}
LineAndScatterChartGrid.contextType = DarkModeContext;

LineAndScatterChartGrid.propTypes = {
  data: PropTypes.array.isRequired,
  width: PropTypes.number.isRequired,
  ratio: PropTypes.number.isRequired,
  type: PropTypes.oneOf(["svg", "hybrid"]).isRequired
};

LineAndScatterChartGrid.defaultProps = {
  type: "svg"
};
LineAndScatterChartGrid = fitWidth(LineAndScatterChartGrid);

export default LineAndScatterChartGrid;
