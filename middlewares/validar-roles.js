const { request, response } = require('express');


//Operador rest u operador spread 
const tieneRole = ( ...roles ) => {

    return (req = request, res= response, next) => {

        if (!req.usuario) {
            return res.status(500).json({
                msg: 'Se quiere verificar el role sin validar el token primero'
            })
        }

        if (!roles.includes( req.usuario.rol)) {
            return res.status(401).json({
                msg: `El servicio requiere uno de estos roles: ${ roles }`
            })

        }

        next();

    }

}

const rolCursoValido = ( ...roles ) => {

    return (req = request, res= response, next) => {
        if (!roles.includes( req.usuario.rol)) {
            return res.status(401).json({
                msg: `El servicio requiere uno de estos roles: ${ roles }`
            })

        }

        next();

    }

}

/*const elRolEs = (rol) => {
    return(req = request, res= response, next) => {
        const rol = require('../models/role')
        if (!rol.includes( req.usuario.rol)) {
            return res.status(401).json({
                msg: `Añadir un cuarto curso requiere del siguiente rol: ${ rol }`
            })
    
        }

        next();
    }

    
}*/


module.exports = {
    tieneRole,
    rolCursoValido
}