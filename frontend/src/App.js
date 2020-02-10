import React from 'react';
import classes from './App.module.css';
import NavigationBar from './components/NavigationBar'


/* This imports the react-bootstrap library */
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (

    <div className={classes.all}>
      {/* This brings in the latest stylesheet for */}
      <link
        rel="stylesheet"
        href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
        integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
        crossorigin="anonymous"
      />
      <NavigationBar></NavigationBar>
      <h1 className={classes.header}> FINEX </h1>
    </div>
    
  );
}

export default App;
