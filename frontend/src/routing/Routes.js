import React from "react";

import { Router, Switch, Route } from "react-router-dom";

import history from "./History";

/* Pages */
import ResetEmail from "../components/ResetEmail/ResetEmail";
import RegistrationPage from "../components/RegistrationPage/RegistrationPage";
import SearchStock from "../components/StockSearch/StockSearch";
import CompareStocks from "../components/CompareStocks/CompareStocks";
// import Chart from "../components/Chart";
import HomePage from "../components/HomePage";
import NotFound from "../components/NotFound";
import AccountPage from "../components/AccountPage/AccountPage";
import LoginPage from "../components/LoginPage/LoginPage";
import StockInfo from "../components/StockInfo";
import ResetName from "../components/ResetName/ResetName";
import ResteUsername from "../components/ResetUsername/ResetUsername";
import FinanceDashboard from "../components/FinanceDashboard/FinanceDashboard";
import BudgetItemForm from "../components/BudgetItemForm";
import IncomeItemForm from "../components/IncomeItemForm";
import CreateBudget from "../components/CreateBudget/CreateBudget";
import ForgotPassword from "../components/ForgotPassword/ForgotPassword";
import ResetPassword from "../components/ResetPassword/ResetPassword";
import SpentSummary from "../components/SpentSummary";
import FinanceDoc from "../components/FinanceDoc/FinanceDoc";
import ResetProfilePicture from "../components/ResetProfilePicture/ResetProfilePicture";
import RiskManagement from "../components/RiskManagement/RiskManagement";
import CategorySummary from "../components/CategorySummary/CategorySummary";
import InvestmentTactics from "../components/InvestmentTactics/InvestmentTactics";


/* Paths */
import { RESET_EMAIL_PATH } from "../constants/Constants";
import { SEARCH_STOCK_PATH } from "../constants/Constants";
import { REGISTRATION_PATH } from "../constants/Constants";
import { YOUR_STOCKS_PATH } from "../constants/Constants";
import { COMPARE_STOCKS_PATH } from "../constants/Constants";
import { HOME_PATH } from "../constants/Constants";
import { ACCOUNT_PATH } from "../constants/Constants";
import { LOGIN_PATH } from "../constants/Constants";
import { RESET_NAME_PATH } from "../constants/Constants";
import { RESET_USERNAME_PATH } from "../constants/Constants";
import { FINANCE_DASHBOARD } from "../constants/Constants";
import { ADD_BUDGET_ITEM } from "../constants/Constants";
import { ADD_INCOME_ITEM } from "../constants/Constants";
import { CREATE_NEW_BUDGET } from "../constants/Constants";
import { FORGOT_PASSWORD_PATH } from "../constants/Constants";
import { RESET_PASSWORD_PATH } from "../constants/Constants";
import { SPENT_SUMMARY_PATH } from "../constants/Constants";
import { FINANCE_DOC_PATH } from "../constants/Constants";
import { RESET_PROFILE_PICTURE_PATH } from "../constants/Constants";
import { RISK_MANAGEMENT_PATH } from "../constants/Constants";
import { CATEGORY_SUMMARY_PATH } from "../constants/Constants";
import { INVESTMENT_TACTICS_PATH } from "../constants/Constants";


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
        <Route path={COMPARE_STOCKS_PATH} component={CompareStocks} />
        <Route path={ACCOUNT_PATH} component={AccountPage} />
        <Route path={LOGIN_PATH} component={LoginPage} />
        <Route path={FINANCE_DASHBOARD} component={FinanceDashboard} />
        <Route path={ADD_BUDGET_ITEM} component={BudgetItemForm} />
        <Route path={ADD_INCOME_ITEM} component={IncomeItemForm} />
        <Route path={CREATE_NEW_BUDGET} component={CreateBudget} />
        <Route path={FORGOT_PASSWORD_PATH} component={ForgotPassword} />
        <Route path={RESET_PASSWORD_PATH} component={ResetPassword} />
        <Route path={SPENT_SUMMARY_PATH} component={SpentSummary} />
        <Route path={FINANCE_DOC_PATH} component={FinanceDoc} />
        <Route
          path={RESET_PROFILE_PICTURE_PATH}
          component={ResetProfilePicture}
        />
        <Route path={RISK_MANAGEMENT_PATH} component={RiskManagement} />
        <Route path={INVESTMENT_TACTICS_PATH} component={InvestmentTactics} />
        <Route path={CATEGORY_SUMMARY_PATH} component={CategorySummary} />
        <Route path="*" component={NotFound} />
      </Switch>
    </Router>
  );
}

export default Routes;
