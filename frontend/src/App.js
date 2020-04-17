import React, { Component } from "react";
import classes from "./App.module.css";
import NavigationBar from "./components/NavigationBar/NavigationBar";
// import RegistrationPage from "./components/RegistrationPage";
import "bootstrap/dist/css/bootstrap.min.css";
// import ResetEmail from "./components/ResetEmail";
import Routes from "./routing/Routes";
// import AccountPage from "./components/AccountPage";
// import HomePage from "./components/HomePage";
import { DarkModeProvider, useDarkModeState } from "./contexts/DarkModeContext";

function BodyWrapper({ children }) {
  const { isDarkMode } = useDarkModeState();
  let newClass = classes.lightMode;
  if (isDarkMode) newClass = classes.darkMode;
  return <div className={newClass}>{children}</div>;
}

class App extends Component {
  render() {
    return (
      <DarkModeProvider>
        <BodyWrapper>
          {/* This brings in the latest stylesheet for all bootstrap tools*/}
          <div className={classes.navContainer}>
            <NavigationBar />
          </div>
          <div className={classes.bodyDiv}>
            <Routes />
          </div>
        </BodyWrapper>
      </DarkModeProvider>
    );
  }
}

export default App;
