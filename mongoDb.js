import { MongoClient } from 'mongodb'

const uri = `mongodb+srv://bernardoosthuizen:07W8IuEHNnwkcPzY@cluster0.s2rr5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`

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
export const updateUser = async (id) => {

    try {
        await client.connect()

    } catch (e) {
        console.error(e)
    } finally {
        await client.close()
    }

      
}