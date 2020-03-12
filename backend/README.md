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
This represents the endpoint to get SMA (Simple moving average) data  
Requirements: some stock code (Eventually can inlclude crypto)  
Returns: JSON object containing data on custom interval or 400 if not found/ parameters are wrong  
Status: Working. Will need work to support crypto  
Bugs: None   

JSON Format:  
{  
    "2020-03-12T17:21:00.000Z": {  
        "EMA": "159.4868"  
&nbsp;&nbsp;&nbsp;&nbsp;}     
} 

### /api/stock/ema/:code/:interval/:series_type  
GET  
This represents the endpoint to get SMA (Exponential moving average) data  
Requirements: some stock code (Eventually can inlclude crypto)  
Returns: JSON object containing data on custom interval or 400 if not found/ parameters are wrong  
Status: Working. Will need work to support crypto  
Bugs: None   

JSON Format:  
{  
    "2020-03-12T17:21:00.000Z": {  
        "EMA": "159.4868"  
&nbsp;&nbsp;&nbsp;&nbsp;}     
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

## Finance

### /finance/budget  
GET  
This represents obtaining current budget  
Requirements: None  
Returns: Returns 400 and "status": "No user logged in." JSON if user not logged in or a JSON list with budget categories, with budgeted amount and spent amount  
Status: STUB  
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
This represents obtaining current incomes  
Requirements: None  
Returns: Returns 400 and "status": "No user logged in." JSON if user not logged in or a JSON list of the user's incomes otherwise  
Status: STUB  
Bugs: ??  

JSON Format (Output):
[
    {
        "username": "shmem",
        "category": "other",
        "type": "income",
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
This represents obtaining current expenses  
Requirements: None  
Returns: Returns 400 and "status": "No user logged in." JSON if user not logged in or a JSON list of the user's expenses otherwise  
Status: STUB  
Bugs: ??  

JSON Format (Output):
[
    {
        "username": "shmem",
        "category": "Food",
        "type": "expense",
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
This represents obtaining totals  
Requirements: None  
Returns: Returns 400 and "status": "No user logged in." JSON if user not logged in or a "budgeted" amount and "spent" amount  
Status: STUB  
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