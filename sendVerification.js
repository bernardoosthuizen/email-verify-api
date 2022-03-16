"use strict";
import nodemailer from 'nodemailer'
import crypto from 'crypto'
import { createUser } from "./mongoDb.js"

export const sendVerification = async (req) => {

    const emailAddress = Object.values(req.query).toString() // DO NOT FORGET TO INSERT

    // Create super secret key
    const secretKey = await crypto.randomBytes(32).toString('base64')

    // Get ID of document in database
    const id = await createUser({email: `${emailAddress}`, key: `${secretKey}`, verified: 'false'})    
    
    // Sends email to user for verification
    async function sendEmail() {
    
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'eldora.eichmann41@ethereal.email',
            pass: 'q6any9HwjUzn1EjbFV'
        },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"Fred Foo 👻" <foo@example.com>', // sender address
        to: "bar@example.com, baz@example.com", // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Please verify your email address", // plain text body
        html: `<h1>Hi there, please click the link below to verify your email address.</h1> <h2><a href="http://localhost:3000/api/verify-email/send-verification?id=${id}&key=${secretKey}">Verify Now</a></h2>`  // html body
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    }

    sendEmail().catch(console.error);
}



