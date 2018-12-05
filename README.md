# SMSSender
A SMS web service for sending SMS message.  
This service takes advantage of burstSMS API, and its functions include sending message to different receivers one time by adding numbers in 'to' field, giving a nickname in the 'From' field and watching the responses history of each send. 
# Install
1. $npm install
2. rename .env.example to .env
3. modify SMS_KEY and SMS_SECRET value
# Run
1. $npm start  
then  
2. Open browser and input http://localhost:3000
# Test
$npm test
# Development guide
## File structure
```
root
-- app.js   Nodejs main entrance with express framework
-- routes   Handle restful api and pass req data to controllers
-- controllers Handle requests by invoking different services
-- services Modules implemented for specific function
-- tests    Unit test files implemented with Mocha 
-- views    Includes partial pages
-- public   Static resources
   -- ng    Angular single page application
      -- app.js      Angular main entrance
      -- controllers UI logic function
      -- services    APIs and mechanism support
```
## Mechanism
1. .env support  
Using ditenv package to load env var into process. At present we only support SMS_KEY and SMS_SECRET.
2. session  
I use session to maintain a client connection. If a client idle last more than 1 hour, the corresponding session expires.  
A session can also store a client's status information.
3. https api request  
According to test, the SMS send request had a body with x-www-form-urlencoded format, not json, but its response is based on json format. So I use querystring to format a js object. 

## Development environment
Windows 10  
Visual studio code  
Nodejs 10.x  
Angular 1.7.5  
API test tool: Postman