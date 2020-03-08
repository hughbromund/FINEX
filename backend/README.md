## URLs for Endpoints

Note: ":" represents a variable

`/api/stock/auto/:input`
GET
This represents the autofill endpoint
Requirements: some input from search box
Returns: empty list if can't find anything or list of stocks
Status: Working
Bugs: might be error on empty input

`/api/stock/intraday/:code`
GET
This represents the basic endpoint to get intraday data
Requirements: some stock code
Returns: JSON object containing quotes on 1 min interval or 400 if not found
Status: Working
Bugs: None

`/api/stock/daily/:code`
GET
This represents the basic endpoint to get daily data
Requirements: some stock code
Returns: JSON object containing quotes on 1 day interval or 400 if not found
Status: Working
Bugs: None

`/api/crypto/auto/:input`
GET
This represents the autofill endpoint
Requirements: some input from search box
Returns: empty list if can't find anything or list of cryptos
Status: Working
Bugs: None

`/auth/login`
POST
This represents the login endpoint
Requirements: "username" and "password" in JSON. Username must be "username" and password must be "password" to succeed in JSON
Returns: returns 200 and JSON object with success message on success or 400 and JSON object with failure message if can't be found.
Status: Working
Bugs: ??

`/auth/register`
POST
This represents the registration endpoint
Requirements: "username", "password", "email", and "name" in JSON. Always works unless username is "exist"
Returns: Returns 400 and failure message if username is "exist" and a JSON object with all inputs otherwise
Status: Working
Bugs: ??

`/auth/logout`
POST
This represents the logout endpoint
Requirements: None
Returns: Returns 400 and failure "msg" if user not logged in and a JSON object with success "msg" otherwise
Status: Working
Bugs: ??

`/auth/user`
GET
This represents obtaining user info endpoint
Requirements: None
Returns: Returns 400 and "status": "no user logged in" JSON if user not logged in and a JSON object with correct "username", "name", and "email" otherwise
Status: Working
Bugs: ??

`/auth/updateEmail`
PUT
This represents updating user email endpoint
Requirements: None
Returns: Returns 400 and "status": "not logged in!" JSON if user not logged in and a JSON object with "status": "email updated" otherwise
Status: Working
Bugs: ??

`/auth/updateName`
PUT
This represents updating user name endpoint
Requirements: None
Returns: Returns 400 and "status": "not logged in!" JSON if user not logged in and a JSON object with "status": "name updated" otherwise
Status: Working
Bugs: ??

`/finance/budget`
GET
This represents obtaining current budget
Requirements: None
Returns: Returns 400 and "status": "no user logged in" JSON if user not logged in or a JSON list with budget categories, with budgeted amount and spent amount
Status: STUB
Bugs: ??

`/finance/income`
GET
This represents obtaining current incomes
Requirements: None
Returns: Returns 400 and "status": "no user logged in" JSON if user not logged in or a JSON list of the user's incomes otherwise
Status: STUB
Bugs: ??

`/finance/expense`
GET
This represents obtaining current expenses
Requirements: None
Returns: Returns 400 and "status": "no user logged in" JSON if user not logged in or a JSON list of the user's expenses otherwise
Status: STUB
Bugs: ??

`/finance/total`
GET
This represents obtaining totals
Requirements: None
Returns: Returns 400 and "status": "no user logged in" JSON if user not logged in or a "budgeted" amount and "spent" amount
Status: STUB
Bugs: ??
