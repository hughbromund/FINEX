import React from "react";
import classes from "./App.module.css";
import ResetEmail from "./components/ResetEmail";

function App() {
  return (
    <div className={classes.all}>
      <h1 className={classes.header}> FINEX </h1>
      <ResetEmail></ResetEmail>
    </div>
  );
}

export default App;
