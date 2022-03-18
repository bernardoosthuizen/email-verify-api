# Email Verification REST API - (In Progress)

## Description
This REST API will allow users to verify email addresses. The intent is to have the API check that an email address is valid by means of regular expressions and sending a verification email to the address.

## Documentation
- [Introduction](#introduction)
- [Installation and Setup](#installation-and-setup)
- [Endpoints](#endpoints)
- [Tests](#tests)

![project-banner](https://user-images.githubusercontent.com/46342592/158291554-31f71c8b-5ea4-4d5a-bdd7-4c36c951fac5.png)



## Introduction
This node.js project allows users to deploy a rudementary email verification process for any project. Once installed, the application will expose endpoints to send a veryfication email to a user and another endpoint to check whether an email address is verified. The endpoints are completely open and do not require authentication, use with caution. 

## Installation and Setup

Clone down this repository. You will need `node` and `npm` installed globally on your machine.  

Installation:

`npm install`   

- Create a database using MongoDB Atlas (https://docs.atlas.mongodb.com/getting-started/)
- Connect MongoDB database by:
  - Creating .env file in the root folder. Create a variable 'MONGO_URI' and set it to your database URI. (remember to instert your password in the URI in the env file only)
  - Set 'dbName' and 'collectionName' variables in the file 'mongoDb.js' to your desired collection and databse.

Nodemailer has been used to send the verification email and creates a test account for each request (see docs here: https://nodemailer.com/about/). It is recommended using a mail provider such as SendGrid to send emails via a HTTPS request. (https://docs.sendgrid.com/for-developers/sending-email/api-getting-started)

You are now set up and can start your server with the command:

`npm start`  

## Endpoints

- Send request to verify an email address : __~/api/verify-email__ (GET) : Accepts one query string: email. No JSON header or body is required to send a request. Example: yourdomain.com/api/verify-email?email=name@domain<area>.com
  - Expected JSON response if successful:
    ```javascript
    {
      "email": {Submitted email address},
      "status": "Verification email sent to user."
    }
    ```
 
 - Errors:
    - Email does not meet formatting requirements.
    ```javascript
    "error:" 
      {
        "code": 406,
        "message": "Invalid email address sent (expected format: someone@domain.com)"
      }
    ```
    - Email already exists in database.<br/>
      ("verified" = true;  when a user has clicked on the verification link sent to them by email)
    ```javascript
    "error:" 
      {
        "code": 409,
        "message": "Email address already exists in database",
        "email": {Submitted email address}
        "verified": true/false
      }
    ```
    - Too many email addresses sent in one request.
    ```javascript
    "error:" 
      {
        "code": 413,
        "message": "Please only send one email per request"
      }
    ```
     - Incorrect key was assigned in request.
    ```javascript
    "error:" 
      {
        "code": 422,
        "message": "Please make sure the request key = email"
      }
    ```
    
  
- Check whether an email address has been verified : __~/api/verify-email/check-verified__ (GET) : Accepts one query string: email. No JSON header or body is required to send a request. Example: yourdomain.com/api/verify-email?email=name@domain<area>.com
  - Expected JSON response if successful:<br/>
    ("verified" = true; when a user has clicked on the verification link sent to them by email)
    ```javascript
    {
      "email": {Submitted email address},
      "verified": true/false
    }
    ```
    
 - Errors:
    - Email does not exist in database.
    ```javascript
    "error:" 
      {
        "error": "Email not found'"
      }
    ```
## Tests

To run tests:

`npm test`
  
