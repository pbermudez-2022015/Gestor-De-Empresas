'use strict'

import jwt from "jsonwebtoken"
import Admin from '../admin/admin.model.js'

export const validateJwt = async (req, res, next) => {
    try {
        //Obtener la llave de acesso al token
        let secretKey = process.env.SECRET_KEY
        //Obtener el token de los headers
        let { authorization } = req.headers
        //Verificar si viene el token
        if (!authorization) return res.status(401).send({ message: 'Unauthorized' })
        //Validar el vid del usuario que envio
        let { uid } = jwt.verify(authorization, secretKey)
        //Validar si aun existe en la DB
        let admin = await Admin.findOne({ _id: uid })
        if (!admin) return res.status(404).send({ message: 'Admin not found - Unauthorizate' })
        req.admin = admin
        next()
    } catch (err) {
        console.error(err)
        return res.status(401).send({ message: 'Invalid Token' })
    }
}

export const isAdmin = async (req, res, next) => {
    try {
        let { admin } = req
        if (!admin || admin.role !== 'ADMIN') return res.status(403).send({ message: `You dont have access: ${admin.adminname}` })
        next()
    } catch (err) {
        console.error(err)
        return res.status(403).send({ message: 'Unauthorized role' })
    }

}