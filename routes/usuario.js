//Importaciones
const { Router } = require('express');
const { check } = require('express-validator');
const { cursoYaExiste } = require('../controllers/curso');
const { getUsuarios, postUsuario, putUsuario, deleteUsuario } = require('../controllers/usuario');
const { esRoleValido, emailExiste, existeUsuarioPorId, esCursoValido, cursoValido, esElCursoValido} = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { tieneRole, rolCursoValido } = require('../middlewares/validar-roles');
const role = require('../models/role');

const router = Router();

router.get('/mostrar', getUsuarios);

router.post('/agregar/alumno', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe de ser más de 6 digitos').isLength( { min: 6 } ),
    check('correo', 'El correo no es valido').isEmail(),
    check('correo').custom( emailExiste ),
    check('rol').default('ROL_ALUMNO').custom( esRoleValido ),
    //check('curso', 'Ya se ha asignado a este curso.').custom(cursoYaExiste),
    check('curso').custom( esCursoValido ),
    //check('curso2', 'Ya se ha asignado a este curso.').custom(cursoYaExiste),
    check('curso2').custom( esCursoValido ), 
    //check('curso3', 'Ya se ha asignado a este curso.').custom(cursoYaExiste), 
    //check('curso3').custom( esCursoValido ), 
    //elRolEs("PROFESOR_ROL"),
    check('curso4', 'Un alumno solo puede asignarse a 3 cursos.').isEmpty(), 
    validarCampos,
] ,postUsuario);

router.post('/agregar/maestro', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe de ser más de 6 digitos').isLength( { min: 6 } ),
    check('correo', 'El correo no es valido').isEmail(),
    check('correo').custom( emailExiste ),
    check('rol').custom( esRoleValido ),
    //check('curso', 'El curso es obligatorio').not().isEmpty(),
    //check('curso').custom( esCursoValido ), 
    //elRolEs("PROFESOR_ROL"),
    validarCampos,
] ,postUsuario);

router.put('/editar/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeUsuarioPorId ),
    check('rol').custom(  esRoleValido ),
    //elRolEs("PROFESOR_ROL"),
    //check('curso4').custom( esCursoValido ), 
    validarCampos
] ,putUsuario);


router.delete('/eliminar/:id', [
    validarJWT,
    //esAdminRole,
    tieneRole('ROL_MAESTRO'),
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeUsuarioPorId ),
    validarCampos
] ,deleteUsuario);


module.exports = router;

/*function validandoCurso(){
    if(role === "ROL_ALUMNO"){
        throw new Error(`Este rol solo puede agregar 3 cursos`);       
    }
}*/


// ROUTES