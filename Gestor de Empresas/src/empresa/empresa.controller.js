'use strict'

import Empresa from './empresa.model.js'
import ExcelJS from 'exceljs';

export const save = async (req, res) => {
    try {
        let data = req.body
        let empresa = new Empresa(data)
        await empresa.save()
        return res.send({ message: 'I make a empresa' })
    } catch (err) {
        console.error.err
        return res.status(500).send({ message: 'Error Saving Empresa' })
    }
}

export const update = async (req, res) => {
    try {
        let { id } = req.params
        let data = req.body
        if (!update) return res.status(400).send({ message: 'Have submitted some data that cannot be updated or missing data' })
        let updatedEmpresa = await Empresa.findOneAndUpdate(
            { _id: id },
            data,
            { new: true }
        );
        if (!updatedEmpresa) return res.status(401).send({ message: 'Publication not found' })
        return res.send({ message: 'Updated Empresa', updatedEmpresa })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error updating Empresa' })
    }
}

export const deleteU = async (req, res) => {
    try {
        return res.status(403).send({ message: 'Empresa deletion is not allowed' })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error deleting account' })
    }
}
export const search = async (req, res) => {
    try {
        const { categoria, trayectoria, sortBy } = req.body;
        let query = {};
        // Agrega filtros según los criterios proporcionados
        if (categoria) {
            query.categoria = categoria;
        }
        if (trayectoria) {
            query.trayectoria = trayectoria;
        }
        // realizar la busqueda de empresas segun los criterios
        let empresas = await Empresa.find(query).sort(sortBy === 'A-Z' ? { nombre: 1 } : { nombre: -1 });
        // Valida si se encontraron empresa
        if (empresas.length === 0) {
            return res.status(404).send({ message: 'No se encontraron empresas con los criterios especificados' });
        }
        // Enviar los resultados de la busqueda
        return res.send({ message: 'Empresas encontradas', empresas });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: 'Error searching empresas' });
    }
};


export const generate = async (req, res) => {
    try {
        // Obtener todas las empresas de la base de datos
        const empresas = await Empresa.find();
        // Validar si se encontraron empresas
        if (empresas.length === 0) {
            return res.status(404).send({ message: 'No hay empresas en la base de datos' });
        }
        // Crear un nuevo workbook de Excel
        let workbook = new ExcelJS.Workbook();
        let worksheet = workbook.addWorksheet('Empresas');
        // Añadir encabezados de columna
        worksheet.addRow(['Nombre', 'Impacto', 'Trayectoria', 'Categoría', 'Número de Empleados']);
        // Añadir datos de empresas al archivo Excel
        empresas.forEach(empresa => {
            worksheet.addRow([empresa.nombre, empresa.impacto, empresa.trayectoria, empresa.categoria, empresa.numeroEmpleados]);
        });
        // Generar el archivo Excel en memoria
        let buffer = await workbook.xlsx.writeBuffer();
        // Enviar el archivo Excel como respuesta
        res.set('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.set('Content-Disposition', 'attachment; filename=empresas.xlsx');
        res.send(buffer);
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error generando el archivo Excel' });
    }
};

