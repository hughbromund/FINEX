import React from "react";

import { Router, Switch, Route, Link } from "react-router-dom";

import history from "./History";

/* Pages */
import ResetEmail from "../components/ResetEmail";
import RegistrationPage from "../components/RegistrationPage";
import SearchStock from "../components/StockSearch/StockSearch";

/* Paths */
import { RESET_PASS_PATH } from "../constants/Constants";
import { SEARCH_STOCK_PATH } from "../constants/Constants";
import { REGISTRATION_PATH } from "../constants/Constants";

function Routes() {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/">
          <RegistrationPage />
        </Route>
        <Route path={RESET_PASS_PATH}>
          <ResetEmail />
        </Route>
        <Route path={SEARCH_STOCK_PATH}>
          <SearchStock />
        </Route>
      </Switch>
    </Router>
  );
}

export default Routes;
