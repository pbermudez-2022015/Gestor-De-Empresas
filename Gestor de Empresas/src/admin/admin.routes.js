import express from 'express'
import { validateJwt } from '../middlewares/validate-jwt.js'
import { test, register, login, deleteU } from './admin.controller.js';

const api = express.Router();

//rutas Publicas
api.post('/register', register)
api.post('/login', login)

//Rutas Privadas
api.delete('/delete/:id', [validateJwt], deleteU)
api.get('/test', [validateJwt], test)
export default api