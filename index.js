"use strict";

import express from 'express'
import { checkRequest } from "./checkRequest.js"
import { sendVerification } from "./sendVerification.js"
import { receiveVerification } from "./receiveVerification.js"

const app = express()

// Allow express to accept JSON
app.use(express.json())

//Handle get request on /api/verify-email enpoint
app.get('/api/verify-email',(req,res) => {
    
    // Check if the email is valid
    const errors = checkRequest(req)

    // If the email is valid send email to make sure it bolongs to someone
    if (errors.error.length == 0) {
        sendVerification(req)
        res.status(200).json({email: Object.values(req.query).toString(), valid: 'true'})
    } else {
        res.json(errors)
    }
    
})

//Handles when a user clicks on verify email link
app.get('/api/verify-email/send-verification',(req,res) => {
    receiveVerification(req)
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


// Send a verification email to user
    // User click on link to endpoint that displays a confirmation page
    // Endpoint also tells server it is verified

// Once verified send response to origin

