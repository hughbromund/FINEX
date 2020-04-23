## URLs for Endpoints

Note: ":" represents a variable  
Note #2: Cryto quote endpoints currently do not have matching keys to the stock endpoints

## Stocks

### /api/stock/auto/:input

GET  
This represents the autofill endpoint  
Requirements: some input from search box  
Returns: empty list if can't find anything or list of stocks  
Status: Working  
Bugs: None

JSON Format:  
[
{
"CODE",
"COMPANY NAME"
},
...
]

### /api/stock/intraday/:code

GET  
This represents the basic endpoint to get intraday data  
Requirements: some stock code  
Returns: JSON object containing quotes on 1 min interval or 400 if not found  
Status: Working  
Bugs: None

JSON Format:  
{  
 "2020-03-06T21:00:00.000Z": {  
 "open": "162.2100",  
 "high": "162.3100",  
 "low": "159.2400",  
 "close": "161.5800",  
 "volume": "1149463"  
&nbsp;&nbsp;&nbsp;&nbsp;}  
}

### /api/stock/daily/:code

GET  
This represents the basic endpoint to get daily data  
Requirements: some stock code  
Returns: JSON object containing quotes on 1 day interval or 400 if not found  
Status: Working  
Bugs: None

JSON Format:  
{  
 "2020-03-06T21:00:00.000Z": {  
 "open": "162.2100",  
 "high": "162.3100",  
 "low": "159.2400",  
 "close": "161.5800",  
 "volume": "1149463"  
&nbsp;&nbsp;&nbsp;&nbsp;}  
}

### /api/stock/sma/:code/:interval/:series_type

GET  
This represents the endpoint to get SMA (Simple moving average) data.  
Blurb: SMA (simple moving average) shows the average price of an index over a period of time.  
Requirements: stock code, an interval (either "intraday" or "daily") and series type ("open", "close", "high", "low")  
Returns: JSON object containing data on custom interval or 400 if not found/ parameters are wrong  
Status: Working. Will need work to support crypto  
Bugs: None

JSON Format:  
{  
 "2020-03-12T17:21:00.000Z": {  
&nbsp;&nbsp; "SMA": "159.4868"  
&nbsp;&nbsp;&nbsp;&nbsp;}  
}

### /api/stock/ema/:code/:interval/:series_type

GET  
This represents the endpoint to get EMA (Exponential moving average) data.  
Blurb: EMA (exponential moving average) shows the average price of an index over a period of time, but places a greater weight and significance on the most recent data points.  
Requirements: stock code, an interval (either "intraday" or "daily") and series type ("open", "close", "high", "low")  
Returns: JSON object containing data on custom interval or 400 if not found/ parameters are wrong  
Status: Working. Will need work to support crypto  
Bugs: None

JSON Format:  
{  
 "2020-03-12T17:21:00.000Z": {  
&nbsp;&nbsp; "EMA": "159.4868"  
&nbsp;&nbsp;&nbsp;&nbsp;}  
}

### /api/stock/rsi/:code/:interval/:series_type

GET  
This represents the endpoint to get RSI (relative strength index) data  
Blurb: RSI (relative strength index) measures the momentum of recent price changes. It ranges from 0-100 and at the low end signifies an index that is being oversold while at the high end signifies an overbought index.  
Requirements: stock code, an interval (either "intraday" or "daily") and series type ("open", "close", "high", "low")  
Returns: JSON object containing data on custom interval or 400 if not found/ parameters are wrong  
Status: Working. Will need work to support crypto  
Bugs: None

JSON Format:  
{  
 "2020-03-12T17:21:00.000Z": {  
&nbsp;&nbsp; "RSI": "37.3574"  
&nbsp;&nbsp;&nbsp;&nbsp;}  
}

### /api/stock/bbands/:code/:interval/:series_type

GET  
This represents the endpoint to get Bollinger Bands data  
Blurb: Bollinger Bands are two lines, above and below the index plot, that expand when the index is volatile and contract when it is less volatile. They can be used to measure where the market will be headed, but not necessarily when, or with what severity it will occur.  
Requirements: stock code, an interval (either "intraday" or "daily") and series type ("open", "close", "high", "low")  
Returns: JSON object containing data on custom interval or 400 if not found/ parameters are wrong  
Status: Working. Will need work to support crypto  
Bugs: None

JSON Format:  
{  
 "2020-03-12T17:21:00.000Z": {  
&nbsp;&nbsp; "Real Lower Band": "141.6096",
&nbsp;&nbsp; "Real Upper Band": "193.3689",
&nbsp;&nbsp; "Real Middle Band": "167.4893"
&nbsp;&nbsp;&nbsp;&nbsp;}  
}

### /api/stock/macd/:code/:interval/:series_type

GET  
This represents the endpoint to get MACD (moving average convergence / divergence) data  
Blurb: MACD (moving average convergence / divergence) shows momemntum in an index. Positive momentum signifies continued gains while negative momentim signifies the opposite.   
Requirements: stock code, an interval (either "intraday" or "daily") and series type ("open", "close", "high", "low")  
Returns: JSON object containing data on custom interval or 400 if not found/ parameters are wrong  
Status: Working. Will need work to support crypto  
Bugs: None

JSON Format:  
{  
 "2020-03-12T17:21:00.000Z": {  
&nbsp;&nbsp; "MACD_Signal": "-3.2184",
&nbsp;&nbsp; "MACD_Hist": "-2.7352",
&nbsp;&nbsp; "MACD": "-5.9537"
&nbsp;&nbsp;&nbsp;&nbsp;}  
}

### /stock/addStock

POST
This represents adding a stock to the user's stock array
Requirements: "stock_id" in JSON
Returns: Returns 400 and "status": "stock id not passed!" JSON if user does not pass an id
and 200 "stock added" on success
Status: Working
Bugs: none as of now

JSON Format (Input):
{
"stock_id": "some ID"
}
or
{
"status": "No user logged in."
}

### /stock/removeStock

POST
This represents removing a stock from the user's stock array
Requirements: "stock_id" in JSON
Returns: Returns 400 and "status": "stock id not passed!" JSON if user does not pass an id
and 200 "stock removed" on success
Status: Working
Bugs: none as of now

JSON Format (Input):
{
"stock_id": "some ID"
}
or
{
"status": "No user logged in."
}

### /stock/getStocks

GET
This represents getting the stock IDs saved to a user account
Requirements: none
Returns: Returns 200 and the user's stock array on success and an error otherwise
Status: Working
Bugs: none as of now

JSON Format (Output):
{
"stocks": [
"stock1",
"stock2",
etc.
]
}

## /stock/sim/createPortfolio

POST
This represents the first time creation of a Portfolio for simulating investments
Requirements: logged in
Returns: 200 if success, 400 if failure
Status: Working
Bugs: None

## /stock/sim/getPortfolio

GET
This represents pulling the users current stock portfolio
Requirements: logged in
Returns: 200 if success, 400 if failure, with JSON listed below
Status: Working
Bugs: None

JSON Format (Output):
{
"status": 200,
"wallet": 4000,
"investing": 1000,
stocks: [
    {
    "code": "aapl",
    "quantity": 4,
    "price": 250,
    "value": 1000,
    "buyPrice": 150,
    "buyValue": 600
    },
    ...
    ]

}

## /stock/sim/buyStock

POST
This represents a user buying a stock
Requirements: logged in, JSON listed below
Returns: 200 if success with message of cost, 400 if failure, with additional messages if error (ex. not enough money, err processing, etc.)
Status: Working
Bugs: None

JSON Format (Input):
{
"code" : "aapl",
"quantity" : 4
}

JSON Format (Output):
{
"status" : "200",
"message" : "Successfully bought for $1000",
"cost": 1000
}

## /stock/sim/sellStock

POST
This represents a user selling a stock
Requirements: logged in, JSON listed below
Returns: 200 if success with message of how much made, 400 if failure, with additional messages if error (ex. don't own that many shares, dont own shares, etc.)
Status: Working
Bugs: None

JSON Format (Input):
{
"code" : "aapl",
"quantity" : 4
}


JSON Format (Output):
{
"status" : "200",
"message" : "Successfully sold for $1000",
"value": 1000
}

## Crypto

### /api/crypto/auto/:input

GET  
This represents the autofill endpoint  
Requirements: some input from search box  
Returns: empty list if can't find anything or list of cryptos  
Status: Working  
Bugs: None

JSON Format:  
[
{
"CODE",
"CRYPTO NAME"
},
...
]

### /api/crypto/daily/:code

GET  
This represents the basic endpoint to get daily data for crypto  
Requirements: some crypto code  
Returns: JSON object containing quotes on 1 day interval or 400 if not found  
Status: Working
Bugs: None

{  
 "2020-03-06T21:00:00.000Z": {  
 "open": "162.2100",  
 "high": "162.3100",  
 "low": "159.2400",  
 "close": "161.5800",  
 "volume": "1149463"  
&nbsp;&nbsp;&nbsp;&nbsp;}  
}

### /api/crypto/weekly/:code

GET  
This represents the basic endpoint to get wekkly data for crypto  
Requirements: some crypto code  
Returns: JSON object containing quotes on 1 week interval or 400 if not found  
Status: Working  
Bugs: None

{  
 "2020-03-06T21:00:00.000Z": {  
 "open": "162.2100",  
 "high": "162.3100",  
 "low": "159.2400",  
 "close": "161.5800",  
 "volume": "1149463"  
&nbsp;&nbsp;&nbsp;&nbsp;}  
}

## Auth

### /auth/login

POST  
This represents the login endpoint  
Requirements: "username" and "password" in JSON. Username must be "username" and password must be "password" to succeed in JSON  
Returns: returns 200 and JSON object with success message on success or 400 and JSON object with failure message if can't be found.  
Status: Working  
Bugs: ??

JSON Format (Input):
{
"username": "shmem",
"password": "shmem"
}

### /auth/register

POST  
This represents the registration endpoint  
Requirements: "username", "password", "email", and "name" in JSON. Always works unless username is "exist"  
Returns: Returns 400 and failure message if username is "exist" and a JSON object with all inputs otherwise  
Status: Working  
Bugs: ??

JSON Format (Input):
{
"username": "shmem",
"password": "shmem"
"email": "basheescript@purdue.edu",
"name": "Sonic"
}

### /auth/logout

POST  
This represents the logout endpoint  
Requirements: None  
Returns: Returns 400 and failure "status" if user not logged in and a JSON object with success "status" otherwise  
Status: Working  
Bugs: ??

JSON Format (Output):
{
"status": "No user logged in."
}

### /auth/user

GET  
This represents obtaining user info endpoint  
Requirements: None  
Returns: Returns 400 and "status": "no user logged in" JSON if user not logged in and a JSON object with correct "username", "name", and "email" otherwise  
Status: Working  
Bugs: ??

JSON Format (Output):
{
"username": "shmem",
"email": "basheescript@purdue.edu",
"name": "Sonic"
}

or

{
"status": "No user logged in."
}

### /auth/updateEmail

PUT  
This represents updating user email endpoint  
Requirements: "email" in JSON
Returns: Returns 400 and "status": "No user logged in." JSON if user not logged in and a JSON object with "status": "email updated" otherwise  
Status: Working  
Bugs: ??

JSON Format (Input):
{
"email": "basheescript@purdue.edu"
}

or

{
"status": "No user logged in."
}

### /auth/updateName

PUT  
This represents updating user name endpoint  
Requirements: "name" in JSON
Returns: Returns 400 and "status": "No user logged in." JSON if user not logged in and a JSON object with "status": "name updated" otherwise  
Status: Working  
Bugs: ??

JSON Format (Input):
{
"name": "Sonic"
}

or

{
"status": "No user logged in."
}

### /user/updateGoodColor

POST
This represents updating the good color preference on a user account
Requirements: "good_color" in JSON
Returns: Returns 400 and "status": "new good color not passed!" JSON if user does not pass a color preference
and 200 "good color updated" on success
Status: Working
Bugs: none as of now

JSON Format (Input):
{
"good_color": "some hash value"
}
or
{
"status": "No user logged in."
}

### /user/updateBadColor

POST
This represents updating the bad color preference on a user account
Requirements: "bad_color" in JSON
Returns: Returns 400 and "status": "new bad color not passed!" JSON if user does not pass a color preference
and 200 "bad color updated" on success
Status: Working
Bugs: none as of now

JSON Format (Input):
{
"bad_color": "some hash value"
}
or
{
"status": "No user logged in."
}

### /user/lightDarkMode

POST
This represents updating the light/dark mode preference on a user account
Requirements: "dark_mode" in JSON
Returns: Returns 400 and "status": "mode preference not passed!" JSON if user does not pass a boolean value
and 200 "mode updated" on success
Status: Working
Bugs: none as of now

JSON Format (Input):
{
"bad_color": true/false
}
or
{
"status": "No user logged in."
}

### /user/acceptWarnings

POST
This represents accepting warnings on a user account
Requirements: "accepted_warnings" in JSON
Returns: Returns 400 and "status": "acceptance status not passed!" JSON if user does not pass a boolean value
and 200 "acceptance status updated" on success
Status: Working
Bugs: none as of now

JSON Format (Input):
{
"accepted_warnings": true/false
}
or
{
"status": "No user logged in."
}

### /user/getGoodColor

GET
This represents getting the good color preference on a user account
Requirements: none
Returns: Returns 200 and the good color hex value on success and an error otherwise
Status: Working
Bugs: none as of now

JSON Format (Output):
{
"good_color": "some hash value"
}

### /user/warningStatus

GET
This represents getting whether or not a user has accepted warnings
Requirements: none
Returns: Returns 200 and the acceptance status on success and an error otherwise
Status: Working
Bugs: none as of now

JSON Format (Output):
{
"accepted_warnings": "true/false"
}
or
{
"status": "No user logged in."
}

### /user/getBadColor

GET
This represents getting the bad color preference on a user account
Requirements: none
Returns: Returns 200 and the bad color hex value on success and an error otherwise
Status: Working
Bugs: none as of now

JSON Format (Output):
{
"bad_color": "some hash value"
}
or
{
"status": "No user logged in."
}

### /user/setProfilePicture

POST
This represents adding a user profile picture to the s3 bucket to save for future use
On success, image will be uploaded to s3 bucket as "<username>"
Requirements: the image itself
Status: Working
Bugs: Only accepting png for right now
JSON Format (form-data) :
    "image": <image>

JSON Format (output) :
{
    "imageUrl": "url"
}

### /user/getProfilePicture

GET
This represents getting a user profile picture from the s3 bucket and returning an image source url
Requirements: none
Status: working
Bugs: None
Output: url to be used in <Image src="url">


### /auth/updatePassword

PUT  
This represents updating user password endpoint  
Requirements: "password" in JSON
Returns: Returns 400 and "status": "No user logged in." JSON if user not logged in and a JSON object with "status": "password updated" otherwise  
Status: Working  
Bugs: ??

JSON Format (Input):
{
"password": "my-secret-password"
}

or
{
"status": "No user logged in."
}

### /auth/resetPassword

PUT  
This represents reseting user password endpoint  
Requirements: "email" in JSON
Returns: Returns 400 and "status": "email not passed!" JSON if no email passed and a JSON object with "status": "If there was a user associated with that email address, an email was sent to them" otherwise  
Status: Working  
Bugs: ??

JSON Format (Input):
{
"email": "basheescript@purdue.edu"
}

JSON Format (Output):

{
"status": "If there was a user associated with that email address, an email was sent to them"
}

or

{
"status": "email not passed!"
}

## Finance

### /finance/budget

GET  
This represents obtaining current budget  
Requirements: None  
Returns: Returns 400 and "status": "No user logged in." JSON if user not logged in or a JSON list with budget categories, with budgeted amount and spent amount  
Status: Working  
Bugs: ??  


JSON Format (Output):
[
{
"category": "food",
"budgeted": "100",
"spent": "250"
},
...
]

or

{
"status": "No user logged in."
}

### /finance/income

GET  
This represents obtaining current incomes for the current month
Requirements: None  
Returns: Returns 400 and "status": "No user logged in." JSON if user not logged in or a JSON list of the user's incomes otherwise  
Status: Working
Bugs: ??

JSON Format (Output):
[
{
"username": "shmem",
"type": "income",
"category": "other",
"cost": "250",
"name": "paycheck"
},
...
]

or

{
"status": "No user logged in."
}

### /finance/expense

GET  
This represents obtaining current expenses for the current month
Requirements: None  
Returns: Returns 400 and "status": "No user logged in." JSON if user not logged in or a JSON list of the user's expenses otherwise  
Status: Working
Bugs: ??

JSON Format (Output):
[
{
"username": "shmem",
"type": "expense",
"category": "Food",
"cost": "250",
"name": "Apples"
},
...
]

or

{
"status": "No user logged in."
}

### /finance/expense/:category

GET  
This represents obtaining current expenses for the current month in specified category
Requirements: correct category in place of ":category"
Returns: Returns 400 and "status": "No user logged in." JSON if user not logged in or a JSON list of the user's expenses in category otherwise  
Status: Working
Bugs: ??

JSON Format (Output):
[
{
"username": "shmem",
"type": "expense",
"category": "Food",
"cost": "250",
"name": "Apples"
},
...
]

or

{
"status": "No user logged in."
}


### /finance/total

GET  
This represents obtaining totals for the current month
Requirements: None  
Returns: Returns 400 and "status": "No user logged in." JSON if user not logged in or a "budgeted" amount and "spent" amount  
Status: Working  
Bugs: ??  


JSON Format (Output):
{
"budgeted": "1000",
"spent": "625"
}

or

{
"status": "No user logged in."
}


### /finance/advice

GET  
This represents obtaining financial advice for the user
Requirements: None  
Returns: Returns 400 and "status": "No user logged in." JSON if user not logged in or a JSON list of the user's advice otherwise. Empty if no advice
Status: Working
Bugs: ??

JSON Format (Output):
[
    {
    "trigger": "Budgeted savings less than 20%.",
    "advice": "Save at least 20% of your income for emergencies and large purchases.",
    "isBudget": true
    },
    {},
    ...
]



### /transaction/newTransaction

POST
This represents adding a new transaction
Requirements: "username", "type", "cost", "name", and "date" in JSON. If date is not specified, the default
current date JSON will be added
MAKE SURE COST IS A NUMBER, IE NOT INSIDE QUOTES ("")
Returns: Returns 400 and error if an error occurs and a JSON representing the new transaction otherwise
Status: Working
Bugs: none as of now

JSON Format (Input):
{
    "type": "type",
    "category": "category",
    "cost": cost,
    "name": "name",
    "date": "date" (optional)
}

### /budget/createBudget

POST
This represents creating a new budget
Requirements: "month", "year", "total", "housing", "utilities", "transportation", "food", "medical",
"savings", "personal", "entertainment", "other"
USERNAME will default to the currently logged in user, no need to input it
Returns: Returns 400 and error if an error occurs and a JSON representing the new budget otherwise
CHECKS: MUST enter the JSON input with NUMBERS (no ""), no negative numbers are allowed,
and all the individual categories must add up to the total value
Status: Working
Bugs: none as of now

JSON Format (Input):
{
"month": month, (AS A NUMBER)
"year": year,
"total": total,
"housing": housing,
"utilities": utilities,
"transportation": transportation,
"food": food,
"medical": medical,
"savings": savings,
"personal": personal,
"entertainment": entertainment,
"other": other
}
