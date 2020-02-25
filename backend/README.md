## URLs for Endpoints

Note: ":" represents a variable

`/api/stock/auto/:input`
This represents the autofill endpoint
Requirements: some input from search box
Returns: empty list if can't find anything or list of stocks
Status: Working
Bugs: might be error on empty input

`/api/stock/intraday/:code`
This represents the basic endpoint to get intraday data
Requirements: some stock code
Returns: JSON object containing quotes on 1 min interval or 400 if not found
Status: Working
Bugs: None

`/api/stock/daily/:code`
This represents the basic endpoint to get daily data
Requirements: some stock code
Returns: JSON object containing quotes on 1 day interval or 400 if not found
Status: Working
Bugs: None

`/auth/login/:username/:password`
This represents the login endpoint
Requirements: username/email and password. Username must be "username" and password must be "password" to succeed
Returns: returns 200 and JSON object with success message on success or 400 and JSON object with failure message if can't be found.
Status: Stub
Bugs: N/A

`/auth/register/:email/:username/:password`
This represents the registration endpoint
Requirements: username, email and password. Always works unless username is "exist"
Returns: Returns 400 and failure message if username is "exist" and a JSON object with all inputs otherwise
Status: Stub
Bugs: N/A