const { response, request } = require('express');
const bcrypt = require('bcryptjs');
//Importación del modelo
const Curso = require('../models/curso');

const getCurso = async (req = request, res = response) => {

    //condiciones del get
    const query = { estado: true };

    const listaCursos = await Promise.all([
        Curso.countDocuments(query),
        Curso.find(query)
    ]);

    res.json({
        msg: 'get Api - Controlador Curso',
        listaCursos
    });

}

const postCurso = async (req = request, res = response) => {

    //Desestructuración
    const { curso } = req.body;
    const CursoGuardadoDB = new Curso({ curso });

    //Guardar en BD
    await CursoGuardadoDB.save();

    res.json({
        msg: 'Post Api - Post Curso',
        CursoGuardadoDB
    });

}


const putCurso = async (req = request, res = response) => {

    
    const { id } = req.params;
    const { _id, ...resto} = req.body;
 
    const cursoEditado = await Curso.findByIdAndUpdate(id, resto);

    res.json({
        msg: 'PUT editar user',
        cursoEditado
    });

}

const deleteCurso = async(req = request, res = response) => {
    //Req.params sirve para traer parametros de las rutas
    const { id } = req.params;

    //Eliminar fisicamente de la DB
    //const usuarioEliminado = await Usuario.findByIdAndDelete( id);

    //Eliminar cambiando el estado a false
     const cursoEliminado = await Curso.findByIdAndUpdate(id, { estado: false });

    res.json({
        msg: 'DELETE eliminar user',
        cursoEliminado
    });
}

module.exports = {
    getCurso,
    postCurso,
    putCurso,
    deleteCurso
}


// CONTROLADOR