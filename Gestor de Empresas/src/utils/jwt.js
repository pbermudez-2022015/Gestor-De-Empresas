'use strict'

import jwt from 'jsonwebtoken'
const secretKey = '@KeySecreta@'

export const generateJwt = async (paylod) => {
    try {
        return jwt.sign(paylod, secretKey, {
            expiresIn: '5h',
            algorithm: 'HS256'
        })

    } catch (err) {
        console.error(err)
        return err
    }
}
