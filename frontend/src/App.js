import React, {Component, useState} from "react";
import classes from "./App.module.css";
import NavigationBar from "./components/NavigationBar";
import RegistrationPage from "./components/RegistrationPage";
import "bootstrap/dist/css/bootstrap.min.css";
import ResetEmail from "./components/ResetEmail";
import Routes from "./routing/Routes";
import AccountPage from "./components/AccountPage";
import HomePage from "./components/HomePage";

// Imports for dark mode toggle (to be moved)
import {DarkModeProvider, useDarkModeState, useDarkModeToggle} from "./contexts/DarkModeContext";
import ToggleButton from 'react-bootstrap/ToggleButton'
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup'
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'

function Toggles() {
  const toggle = useDarkModeToggle()
  const {isDarkMode} = useDarkModeState()
  return (
    <div>
    {isDarkMode + ""}
    <ButtonToolbar>
      <ToggleButtonGroup name="radio">
        <ToggleButton variant="light" 
            onClick={() => toggle({type: 'turnOffDarkMode'})}
            value="light" 
            type="radio" 
            name="radio" 
            defaultChecked> Light Mode </ToggleButton>
        <ToggleButton variant="dark" 
            onClick={() => toggle({type: 'turnOnDarkMode'})}
            value="dark" 
            type="radio" 
            name="radio"> Dark Mode </ToggleButton>                    
      </ToggleButtonGroup>
    </ButtonToolbar>
    </div>
  )
}

function BodyWrapper({children}) {
  const {isDarkMode} = useDarkModeState();
  if (isDarkMode) {
    return (
      <div className={classes.darkMode}>
        {children}
      </div>
    )
  } else {
    return (
      <div className={classes.lightMode}>
        {children}
      </div>
    )
  }
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
        <Toggles />
      </BodyWrapper>
    </DarkModeProvider>
    );
  }
}

export default App;
