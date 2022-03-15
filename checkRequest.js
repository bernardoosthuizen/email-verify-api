import express from 'express'

export const checkRequest = (req) => {

    // var errors = ["error:"];

    var errors = {error: []}

    const request = req.query

    const requestKey = Object.keys(request)

    if (requestKey.length > 1) {
        // errors.error = Object.assign(errors.error,{code: 429, message: 'Please only send one email pre request'})
        errors.error.push({code: 429, message: 'Please only send one email pre request'})
    } 

    if (requestKey != 'email'){
        errors.error.push({code: 405, message: 'Please make sure the request key = email'})
    }

    

    
    return errors;


} 





