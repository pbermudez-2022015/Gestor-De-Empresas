'use strict' //Modo estricto

import Admin from './admin.model.js'
import { encrypt, checkPassword, } from '../utils/validator.js'
import { generateJwt } from '../utils/jwt.js'

export const test = (req, res) => {
    console.log('test is running')
    return res.send({ message: 'Test is running' })
}

export const register = async (req, res) => {
    try {
        let data = req.body
        data.password = await encrypt(data.password)
        data.role = 'ADMIN'
        let admin = new Admin(data)
        await admin.save()
        return res.send({ message: `Registered successfully, can be logged with admin ${admin.adminname}` })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error registering admin', err: err })
    }
}

export const login = async (req, res) => {
    try {
        const { identifier, password } = req.body; // "identifier" puede ser el correo electrónico o el nombre de usuario
        // Validar que el usuario exista (busca por correo electrónico o nombre de usuario)
        let admin = await Admin.findOne({ $or: [{ email: identifier }, { adminname: identifier }] });
        // Verificar que el admin exista y que la contraseña coincida
        if (admin && await checkPassword(password, admin.password)) {
            let loggedAdmin = {
                uid: admin._id,
                username: admin.username,
                name: admin.name,
                role: admin.role
            };
            // Generar Token
            let token = await generateJwt(loggedAdmin);
            return res.send({ message: `Welcome ${loggedAdmin.name}`, token, loggedAdmin });
        }
        return res.status(404).send({ message: 'Invalid credentials' });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error to login' });
    }
}

export const deleteU = async (req, res) => {
    try {
        // Siempre responder con un mensaje de error indicando que la eliminación de Admin no está permitida
        return res.status(403).send({ message: 'admin deletion is not allowed' })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error deleting account' })
    }
}
