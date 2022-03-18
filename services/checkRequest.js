// This module checks that the request sent is formatted correctly.
// Function called in 'index.js'

import { findVerified } from "./mongoDb.js"

export const checkRequest = async (reqQuery) => {

    var errors = {error: []}

    const requestKey = Object.keys(reqQuery)

    // Check that only one key was sent with the request
    if (requestKey.length > 1) {
        errors.error.push({code: 413, message: 'Please only send one email per request'})
    } 

    // // Check that only one value was assigned to email key
    if (requestKey == 'email' && Array.from(reqQuery.email)[0].length != 1) {
        errors.error.push({code: 413, message: 'Please only send one email per request'})
    } 

    // Check that the request key includes an email
    if (requestKey != 'email'){
        errors.error.push({code: 422, message: 'Please make sure the request key = email'})
    }

    // Check that the request value is in a format of an email.
    let emailRegex = new RegExp("([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])");
    
    if (!emailRegex.test(Object.values(reqQuery))) {
        errors.error.push({code: 406, message: 'Invalid email address sent (expected format: someone@domain.com)'})
    }

    // Check if the email has already been added to the database
    const exists = await findVerified(reqQuery)

    if (exists) {
        errors.error.push({code: 409, message: 'Email address already exists in database', email: exists.email, verified: exists.verified}) 
    }

    return errors
} 





