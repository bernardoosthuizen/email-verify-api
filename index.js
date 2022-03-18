// This file is the main entry point and handles all the request to the api endpoints.

"use strict";

import express from 'express'
import { checkRequest } from "./services/checkRequest.js"
import { sendVerification } from "./services/sendVerification.js"
import { findVerified, updateVerifiedStatus } from "./services/mongoDb.js"

const app = express()

// Allow express to accept JSON
app.use(express.json())


//Handle get request on /api/verify-email endpoint
//This is the initial request to verify an email address
app.get('/api/verify-email', async (req,res) => {
    
    // Check if the email is valid
    const errors = await checkRequest(req.query)

    // If the email is valid send email to make sure it bolongs to someone
    if (errors.error.length == 0) {
        sendVerification(req)
        res.status(200).json({email: `${Object.values(req.query).toString()}`, status:`Verification email sent to user.`})
    } else {
        res.json(errors)
    } 
})



//Handles when a user clicks on verify email link
app.get('/api/verify-email/send-verification',async (req,res) => {
    const result = await updateVerifiedStatus(req)

    if(result.acknowledged = true) {
        res.status(200).send('<h1>Your email has been successfully verified.</h1>') 
    } else {
        res.status(501).send('<h1>There has been an error. Please try again later.</h1>') 
    }  
})

//Handles when a user wants to check if a email if verified
app.get('/api/verify-email/check-verified',async (req,res) => {
    const result = await findVerified(req)

    if (result) {
        res.status(200).json({email: result.email, verified: result.verified})
    } else {
        res.status(404).json({error: 'Email not found'})
    } 
})



//Handle unknown endpoint
app.all('*', (req,res) => {
    res.status(404).json({error: 'Endpoint not found'})
})


// Initialise server to listen on designated port
app.listen(3000, () => {
    console.log('Server has started. Listening on port 3000.')
})

