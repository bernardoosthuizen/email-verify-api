import { MongoClient } from 'mongodb'
import dotenv from "dotenv";

dotenv.config();

const uri = process.env.MONGO_URI

const client = new MongoClient(uri)

// Creates a new document with user 'email', 'id' and 'verified' fields
// Function called in sendVerification.js
export const createUser = async (newUser) => {

    var id

    try {
        await client.connect()

        const result = await client.db("mailVerifyDb").collection("_emails").insertOne(newUser)

        var id = result.insertedId.toString()

    } catch (e) {
        console.error(e)
    } finally {
        await client.close()
    }

    return id  
}



// Verifies wether email is already verified
// Function called findByEmail.js
export const findVerified = async (req) => {

    const email = req.query.email

    var result;

    try {
        await client.connect()

        var result = await client.db("mailVerifyDb").collection("_emails").findOne({email: `${email}`})
    } catch (e) {
        console.error(e)
    } finally {
        await client.close()
    }

 return result   
}



// Updates document 'verified' field to 'true'.
// Function called in receiveVerification.js
export const updateVerifiedStatus = async (req) => {

    const key = req.query.key

    var result;

    try {
        await client.connect()

        var result = await client.db("mailVerifyDb").collection("_emails").updateOne({key: `${key}`}, {$set: {verified: true}})
    } catch (e) {
        console.error(e)
    } finally {
        await client.close()
    }

 return result   
}