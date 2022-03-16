import { updateUser } from "./mongoDb.js"

export const receiveVerification = (req) => {
    const key = req.query.key
    const id = req.query.id

    
    console.log(key)
    console.log(id)
}