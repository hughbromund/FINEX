import React from "react";

import { Router, Switch, Route, Link } from "react-router-dom";

import history from "./History";

/* Pages */
import ResetEmail from "../components/ResetEmail";
import RegistrationPage from "../components/RegistrationPage";
import SearchStock from "../components/StockSearch/StockSearch";
import Chart from "../components/Chart";
import HomePage from "../components/HomePage";
import NotFound from "../components/NotFound";
import AccountPage from "../components/AccountPage"

/* Paths */
import { RESET_PASS_PATH } from "../constants/Constants";
import { SEARCH_STOCK_PATH } from "../constants/Constants";
import { REGISTRATION_PATH } from "../constants/Constants";
import { YOUR_STOCKS_PATH } from "../constants/Constants";
import { HOME_PATH } from "../constants/Constants";
import { ACCOUNT_PATH } from "../constants/Constants"

function Routes() {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path={HOME_PATH} component={HomePage} />
        <Route path={REGISTRATION_PATH} component={RegistrationPage} />
        <Route path={RESET_PASS_PATH} component={ResetEmail} />
        <Route path={SEARCH_STOCK_PATH} component={SearchStock} />
        <Route path={YOUR_STOCKS_PATH} component={Chart} />
        <Route path={ACCOUNT_PATH} component={AccountPage} />
        <Route path="*" component={NotFound} />
      </Switch>
    </Router>
  );
}

export default Routes;
