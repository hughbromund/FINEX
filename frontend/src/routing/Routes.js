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
import AccountPage from "../components/AccountPage";
import LoginPage from "../components/LoginPage";
import StockInfo from "../components/StockInfo";
import ResetName from "../components/ResetName";
import ResteUsername from "../components/ResetUsername";
import FinanceDashboard from "../components/FinanceDashboard"
import BudgetItemForm from "../components/BudgetItemForm";
import CreateBudget from "../components/CreateBudget"

/* Paths */
import { RESET_EMAIL_PATH } from "../constants/Constants";
import { SEARCH_STOCK_PATH } from "../constants/Constants";
import { REGISTRATION_PATH } from "../constants/Constants";
import { YOUR_STOCKS_PATH } from "../constants/Constants";
import { HOME_PATH } from "../constants/Constants";
import { ACCOUNT_PATH } from "../constants/Constants"
import { LOGIN_PATH } from "../constants/Constants"
import { RESET_NAME_PATH} from "../constants/Constants"
import { RESET_USERNAME_PATH } from "../constants/Constants"
import { FINANCE_DASHBOARD } from "../constants/Constants"
import { ADD_BUDGET_ITEM } from "../constants/Constants";
import { CREATE_NEW_BUDGET } from "../constants/Constants"


function Routes() {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path={HOME_PATH} component={HomePage} />
        <Route path={REGISTRATION_PATH} component={RegistrationPage} />
        <Route path={RESET_EMAIL_PATH} component={ResetEmail} />
        <Route path={RESET_USERNAME_PATH} component={ResteUsername} />
        <Route path={RESET_NAME_PATH} component={ResetName} />
        <Route path={SEARCH_STOCK_PATH} component={SearchStock} />
        <Route path={YOUR_STOCKS_PATH} component={StockInfo} />
        <Route path={ACCOUNT_PATH} component={AccountPage} />
        <Route path={LOGIN_PATH} component={LoginPage} />
        <Route path={FINANCE_DASHBOARD} component={FinanceDashboard} />
        <Route path={ADD_BUDGET_ITEM} component={BudgetItemForm} />
        <Route path={CREATE_NEW_BUDGET} component={CreateBudget}/>
        <Route path="*" component={NotFound} />
      </Switch>
    </Router>
  );
}

export default Routes;
