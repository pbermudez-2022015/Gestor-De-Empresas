'use strict'

import { hash, compare } from 'bcrypt'

//Encriptar la Contrase;a
export const encrypt = (password) => {
    try {
        return hash(password, 10)
    } catch (err) {
        console.error(err)
        return err
    }
}

//Validar la contrase;a 
export const checkPassword = async (password, hash) => {
    try {
        return await compare(password, hash)
    } catch (err) {
        console.error(err);
        return err
    }
}

export const checkUpdate = (data, adminId) => {
    if (adminId) {
        if (
            Object.entries(data).length === 0 ||
            data.password ||
            data.password == '' ||
            data.role ||
            data.role == '' ||
            data.publicacion ||
            data.publicacion == ''
        ) {
            return false
        }
        return true
    }
}