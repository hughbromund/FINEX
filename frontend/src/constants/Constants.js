/* Paths for frontend routing */
export const HOME_PATH = "/";
export const YOUR_STOCKS_PATH = "/stocks";
export const SEARCH_STOCK_PATH = "/searchstock";
export const REGISTRATION_PATH = "/registration";
export const RESET_EMAIL_PATH = "/resetemail";
export const ACCOUNT_PATH = "/account";
export const LOGIN_PATH = "/login";
export const RESET_NAME_PATH = "/resetname";
export const RESET_USERNAME_PATH = "/resetusername";
export const FORGOT_PASSWORD_PATH = "/forgotpassword";
export const FINANCE_DASHBOARD = "/finance";
export const ADD_BUDGET_ITEM = "/addbudgetitem";
export const ADD_INCOME_ITEM = "/addincomeitem";
export const CREATE_NEW_BUDGET = "/newbudget";
export const RESET_PASSWORD_PATH = "/updatepassword";
export const CRYPTO_EXTENSION = "/crypto/";
export const SPENT_SUMMARY_PATH = "/spendingsummary";
export const FINANCE_DOC_PATH = "/financedoc";
export const RESET_PROFILE_PICTURE_PATH = "/resetpic";

/* Base URL for Backend */
export const BASE = "http://localhost:5000";

/* Paths to Call Backend */

export const LOGIN_URL = BASE + "/auth/login";
export const LOGOUT_URL = BASE + "/auth/logout";
export const REGISTER_URL = BASE + "/auth/register";
export const USER_INFO_URL = BASE + "/auth/user";
export const STOCK_LIST_URL = BASE + "/api/stock/auto/";
export const STOCK_INTRADAY_URL = BASE + "/api/stock/intraday/";
export const STOCK_DAILY_URL = BASE + "/api/stock/daily/";
export const CRYPTO_LIST_URL = BASE + "/api/crypto/auto/";
export const CRYPTO_DAILY_URL = BASE + "/api/crypto/daily/";
export const CRYPTO_INTRADAY_URL = BASE + "/api/crypto/daily/";
export const UPDATE_EMAIL_URL = BASE + "/auth/updateEmail";
export const UPDATE_NAME_URL = BASE + "/auth/updateName";
export const UPDATE_USERNAME_URL = BASE + "/auth";
export const GET_BUDGET_CATEGORIES = BASE + "/finance/budget";
export const GET_EXPENSE_LIST = BASE + "/finance/expense";
export const GET_OVERALL_BUDGET = BASE + "/finance/total";
export const GET_INCOME_LIST = BASE + "/finance/income";
export const GET_CATEGORY_BUDGET = BASE + "/finance/budget";
export const PUT_RESET_PASSWORD = BASE + "/auth/resetPassword";
export const PUT_UPDATE_PASSWORD = BASE + "/auth/updatePassword";
export const UPDATE_GOOD_COLOR = BASE + "/user/updateGoodColor";
export const GET_GOOD_COLOR = BASE + "/user/getGoodColor";
export const UPDATE_BAD_COLOR = BASE + "/user/updateBadColor";
export const GET_BAD_COLOR = BASE + "/user/getBadColor";
export const FOLLOW_STOCK_URL = BASE + "/stock/addStock";
export const UNFOLLOW_STOCK_URL = BASE + "/stock/removeStock";
export const CREATE_TRANSACTION = BASE + "/transaction/newTransaction";
export const POST_CREATE_BUDGET = BASE + "/budget/createBudget";
export const GET_FOLLOWED_STOCKS_URL = BASE + "/stock/getStocks";
export const GET_BBANDS = BASE + "/api/stock/bbands/";
export const GET_RSI = BASE + "/api/stock/rsi/";
export const GET_EMA = BASE + "/api/stock/ema/";
export const GET_SMA = BASE + "/api/stock/sma/";
export const GET_MACD = BASE + "/api/stock/macd/";

/* Color Hexes */

export const GREEN_COLOR_HEX = "#34C759";
export const RED_COLOR_HEX = "#FF3B30";
export const BLACK_COLOR_HEX = "#FFFFFF";
export const BLUE_COLOR_HEX = "#0000FF";
export const YELLOW_COLOR_HEX = "#FFFF00";
