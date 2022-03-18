"use strict";

import express from 'express'
import { checkRequest } from "./checkRequest.js"
import { sendVerification } from "./sendVerification.js"
import { findVerified, updateVerifiedStatus } from "./mongoDb.js"

const app = express()

// Allow express to accept JSON
app.use(express.json())


//Handle get request on /api/verify-email endpoint
//This is the initial request to verify an email address
app.get('/api/verify-email',(req,res) => {
    
    // Check if the email is valid
    const errors = checkRequest(req)

    // If the email is valid send email to make sure it bolongs to someone
    if (errors.error.length == 0) {
        sendVerification(req)
        res.status(200).json({email: `${Object.values(req.query).toString()}`, status:`Verification email sent to user.`})
    } else {
        res.json(errors)
    } 
})



//Handles when a user clicks on verify email link
app.get('/api/verify-email/send-verification',(req,res) => {
    res.status(200).send('<h1>Your email has been successfully verified.</h1>')
    updateVerifiedStatus(req)
})

//Handles when a user wants to check if a email if verified
app.get('/api/verify-email/is-verified',async (req,res) => {
    const result = await findVerified(req)   
    res.status(200).json({email: result.email, verified: result.verified})
})



//Handle unknown endpoint
app.all('*', (req,res) => {
    res.status(404).json({error: 'Endpoint not found'})
})


// Initialise server to listen on designated port
app.listen(3000, () => {
    console.log('Server has started. Listening on port 3000.')
})




// TODO


// Once verified send response to origin

