import React from "react";
import classes from "./App.module.css";
import NavigationBar from "./components/NavigationBar"
import RegistrationPage from "./components/RegistrationPage"
import 'bootstrap/dist/css/bootstrap.min.css';
import ResetEmail from "./components/ResetEmail";


function App() {
  return (
    <div className={classes.all}>
      {/* This brings in the latest stylesheet for all bootstrap tools*/}
      <link
        rel="stylesheet"
        href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
        integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
        crossorigin="anonymous"
      />
      <NavigationBar></NavigationBar>
      <div className={classes.bodyDiv}>
        <RegistrationPage></RegistrationPage>
      </div>
      <h1 className={classes.header}> FINEX </h1>
      <ResetEmail />

    </div>
  );
}

export default App;
