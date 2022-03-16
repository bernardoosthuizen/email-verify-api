// This module checks that the request sent is formatted correctly.
// Function called in 'index.js'

export const checkRequest = (req) => {

    // var errors = ["error:"];

    var errors = {error: []}

    const request = req.query

    const requestKey = Object.keys(request)

    // Check that only one key was sent with the request
    if (requestKey.length > 1) {
        errors.error.push({code: 413, message: 'Please only send one email per request'})
    } 

    // Check that the request key includes an email
    if (requestKey != 'email'){
        errors.error.push({code: 422, message: 'Please make sure the request key = email'})
    }

    // Check that the request value is in a format of an email.
    let emailRegex = new RegExp("([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])");
    
    if (!emailRegex.test(Object.values(request))) {
        errors.error.push({code: 406, message: 'Invalid email address sent (expected format: someone@domain.com)'})
    }

    return errors
} 





