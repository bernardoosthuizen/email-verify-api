import { updateVerifiedStatus } from "./mongoDb.js"

export const receiveVerification = async (req) => {
    const key = req.query.key

    updateVerifiedStatus(key, {verified: true}) 
}