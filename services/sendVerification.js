// This module handles the addition of data to the the database and sends an email with verification link to the user.
// Function called in 'index.js'


"use strict";
import nodemailer from 'nodemailer'
import crypto from 'crypto'
import { createUser } from "./mongoDb.js"

export const sendVerification = async (req) => {

    const emailAddress = Object.values(req).toString() // DO NOT FORGET TO INSERT

    // Create super secret key
    const secretKey = await crypto.randomBytes(32).toString('hex')

    // Get ID of document in database
    const id = await createUser({email: `${emailAddress}`, key: `${secretKey}`, verified: false})    
    
    // Sends email to user for verification
    async function sendEmail() {

    // Only needed if you don't have a real mail account for testing
    let testAccount = await nodemailer.createTestAccount();
    
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: testAccount.user,
            pass: testAccount.pass
        },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"Fred Foo 👻" <foo@example.com>', // sender address
        to: emailAddress, // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Please verify your email address", // plain text body
        html: `<h1>Hi there, please click the link below to verify your email address.</h1> <h2><a href="http://localhost:3000/api/verify-email/send-verification?id=${emailAddress}&key=${secretKey}">Verify Now</a></h2>`  // html body
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    }

    return sendEmail().catch(console.error);

}



