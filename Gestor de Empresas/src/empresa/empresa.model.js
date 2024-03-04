import mongoose from "mongoose"

const empresaSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    impacto: {
        type: String,
        required: true
    },
    trayectoria: {
        type: String,
        required: true
    },
    categoria: {
        type: String,
        required: true
    },
    numeroEmpleados: {
        type: Number,
        required: true
    }

})

export default mongoose.model('empresa', empresaSchema)