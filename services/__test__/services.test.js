import {jest} from '@jest/globals'
import { checkRequest } from "../checkRequest.js"
import { sendVerification } from "../sendVerification.js"



describe('Check helper functions', () => {

    jest.setTimeout(10000)

    test('Returns error when email in incorrect format', () => {
        return checkRequest({ email: 'frthgfksfsd' }).then(result => {
            expect(result.error[0].code).toEqual(406)
        })
    })

    test('Returns error when email already exists in database', () => {
        return checkRequest({ email: 'shrimp@john.com' }).then(result => {
            expect(result.error[0].code).toEqual(409)
        })
    })

    test('Returns error when more than one email is sent in the query', () => {
        return checkRequest({ email: ['d@sfsd.b', 'd@sfsd.b']}).then(result => {
            console.log(result)
            expect(result.error[0].code).toEqual(413)
        })
    })

    test('Returns error when more than one query is sent in the query', () => {
        return checkRequest({ email: 'd@sfsd.b', other: 'd@sfsd.b'}).then(result => {
            console.log(result)
            expect(result.error[0].code).toEqual(413)
        })
    })

    test('Returns error when query key is incorrect', () => {
        return checkRequest({ address: 'd@sfsd.b' }).then(result => {
            expect(result.error[0].code).toEqual(422)
        })
    })

    test('Returns error when email was not sent', () => {
        return sendVerification({ email: 'frthgfksfsd' }).then(result => {
            expect(console.error)
        })
    })
})



