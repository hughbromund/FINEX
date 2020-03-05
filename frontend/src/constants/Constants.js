/* Paths for frontend routing */
export const HOME_PATH = '/';
export const YOUR_STOCKS_PATH = '/stocks'
export const SEARCH_STOCK_PATH = '/searchstock'
export const REGISTRATION_PATH = '/registration'
export const RESET_EMAIL_PATH = '/resetemail'
export const ACCOUNT_PATH = '/account'
export const LOGIN_PATH = '/login'
export const RESET_NAME_PATH = '/resetname'

/* Base URL for Backend */
export const BASE = 'http://localhost:5000'

/* Paths to Call Backend */
export const LOGIN_URL = BASE + "/auth/login"
export const LOGOUT_URL = BASE + "/auth/logout"
export const REGISTER_URL = BASE + "/auth/register"
export const USER_INFO_URL = BASE + "/auth/user"
export const STOCK_LIST_URL = BASE + "/api/stock/auto/"
export const STOCK_INTRADAY_URL = BASE + "/api/stock/intraday/"
export const STOCK_DAILY_URL = BASE + "/api/stock/daily/"
export const UPDATE_EMAIL_URL = BASE + "/auth/update_email"
