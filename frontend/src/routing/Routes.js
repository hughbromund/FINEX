import React from 'react';

import {
  Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import history from "./history";
import Temp1 from "./Temp1";
import Temp2 from "./Temp2"

function Routes() {
  return (
    <Router history={history}>
    <Switch>
        <Route exact path="/">
        <Temp1 />
        </Route>
        <Route path="/temp2">
        <Temp2 />
        </Route>
    </Switch>
    </Router>
  );
}

export default Routes;