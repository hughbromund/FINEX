import React from "react";
import classes from "./App.module.css";
import NavigationBar from "./components/NavigationBar"
import RegistrationPage from "./components/RegistrationPage"
import 'bootstrap/dist/css/bootstrap.min.css';
import ResetEmail from "./components/ResetEmail";
import Routes from "./routing/Routes";


function App() {
  return (
    <div className={classes.all}>
      {/* This brings in the latest stylesheet for all bootstrap tools*/}
      <Routes />

    </div>
  );
}

export default App;
