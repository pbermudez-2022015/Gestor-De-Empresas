'use strict'

//importaciones 
import express from "express"
import morgan from "morgan"
import helmet from "helmet"
import cors from "cors"
import { config } from "dotenv"
import adminRoutes from "../src/admin/admin.routes.js"
import empresasRoutes from "../src/empresa/empresa.routes.js"


//configuraciones
const app = express()
config();
const port = process.env.PORT || 3056

//configuraciones del servidor
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())//Aceptar o denegar solicitudes de diferentes orígenes (local, remoto) / políticas de acceso
app.use(helmet())//Aplica capa de seguridad básica al servidor
app.use(morgan('dev'))//Logs de solicitudes al servidor HTTP

//declaracion de rutas
app.use('/admin', adminRoutes)
app.use('/empresa', empresasRoutes)
//levantar el servidor
export const initServer = () => {
    app.listen(port)
    console.log(`Server HTTP running in port ${port}`)
}