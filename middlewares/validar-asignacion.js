const { response, request } = require('express');

const Curso = require("../models/curso");

const validarAlumnoExiste = async(req = request, res = response, next)=>{
    const { id } = req.usuario;

    const query = {alumnos: id}

    const alumno = await Curso.findOne(query);

    if (alumno) {
        return res.status(400).json({
            msg: `El alumno con id: ${ id } ya esta asignado a este curso.`
        })
    }else {
        next()
    }
}

const validarAsignacionCursos = async(req = request, res = response, next)=>{
    const { id } = req.usuario;

    const query = {alumnos:id} 

    const asignaciones = await Curso.countDocuments(query)

    if(asignaciones >= 3){
        return res.status(400).json({
            msg: ` El alumno con id: ${ id } ya se ha asignado a 3 cursos, ya no puede asignarse a más.`
        });
    }else(
        next()
    )
}

module.exports = {
    validarAsignacionCursos,
    validarAlumnoExiste
}