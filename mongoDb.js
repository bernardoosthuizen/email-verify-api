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

        var id = await result.insertedId.toString()

    } catch (e) {
        console.error(e)
    } finally {
        await client.close()
    }

    return id  
}



// Updates document 'verified' field to 'true'.
// Function called in receiveVerification.js
export const findByKey = async (key) => {

    var result;

    try {
        await client.connect()

        var result = await client.db("mailVerifyDb").collection("_emails").findOne({key: `${key}`})
    } catch (e) {
        console.error(e)
    } finally {
        await client.close()
    }

 return result   
}

// Updates document 'verified' field to 'true'.
// Function called in receiveVerification.js
export const updateVerifiedStatus = async (key, updatedStatus) => {

    var result;

    try {
        await client.connect()

        var result = await client.db("mailVerifyDb").collection("_emails").updateOne({key: `${key}`}, {$set: updatedStatus})
    } catch (e) {
        console.error(e)
    } finally {
        await client.close()
    }

 return result   
}