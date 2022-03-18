import {jest} from '@jest/globals'
import { findVerified, createUser, updateVerifiedStatus } from "../mongoDb.js"

describe('Check endpoint functions', () => {
    jest.setTimeout(10000)
    
    test('Check user can be created in database', () => {
        return createUser({ email: 'billydean@john.com' }).then(result => {
            expect.anything()
        })
    })

    test('Check email addresses can be looked up', () => {
        return findVerified({ email: 'shrimp@john.com' }).then(result => {
            expect(result.verified).toEqual(true)
        })
    })
    
})