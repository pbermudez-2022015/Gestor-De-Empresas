import express from 'express'
import { validateJwt } from '../middlewares/validate-jwt.js'
import { save, update, deleteU, search, generate } from './empresa.controller.js'

const api = express.Router();

//Rutas Privadas

api.post('/save', [validateJwt], save)
api.put('/update/:id', [validateJwt], update)
api.post('/search', [validateJwt], search)
api.delete('/delete/:id', [validateJwt], deleteU)
api.post('/generate', [validateJwt], generate);

export default api