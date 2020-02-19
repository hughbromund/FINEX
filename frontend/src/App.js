import React from "react";
import classes from "./App.module.css";
import NavigationBar from "./components/NavigationBar";
import RegistrationPage from "./components/RegistrationPage";
import "bootstrap/dist/css/bootstrap.min.css";
import ResetEmail from "./components/ResetEmail";
import Routes from "./routing/Routes";
import HomePage from "./components/HomePage";

function App() {
  return (
    <div className={classes.all}>
      {/* This brings in the latest stylesheet for all bootstrap tools*/}
      <div className={classes.navContainer}>
        <NavigationBar />
      </div>
      <HomePage />
    </div>
  );
}

export default App;
