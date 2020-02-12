import React from "react";
import classes from "./App.module.css";
import Chart from "./components/Chart";

function App() {
  return (
    <div className={classes.all}>
      <h1 className={classes.header}> FINEX </h1>
      <Chart />
    </div>
  );
}

export default App;
