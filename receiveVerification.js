import { findByKey } from "./mongoDb.js"
import { updateVerifiedStatus } from "./mongoDb.js"

export const receiveVerification = async (req) => {
    const key = req.query.key
    const email = req.query.id

    // Get user info
    const result = await findByKey(key)

    if (result.email === email) {
        // Update 'verified field'
        console.log("You legend")
    } else {
        console.log("You suck")
    }
    
}