//Importaciones
const { Router } = require('express');
const { check } = require('express-validator');
const { cursoYaExiste } = require('../controllers/curso');
const { getUsuarios, postUsuario, putUsuario, deleteUsuario, validacionCurso, getUsuarioPorID } = require('../controllers/usuario');
const { esRoleValido, emailExiste, existeUsuarioPorId, esCursoValido, cursoValido, esElCursoValido, existeCursoPorId} = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { tieneRole, rolCursoValido, esMaestroRole } = require('../middlewares/validar-roles');
const role = require('../models/role');

const router = Router();

router.get('/mostrar', getUsuarios);
router.get('/mostrar/:id', getUsuarioPorID);

router.post('/agregar/alumno', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe de ser más de 6 digitos').isLength( { min: 6 } ),
    check('correo', 'El correo no es valido').isEmail(),
    check('correo').custom( emailExiste ),
    check('rol').default('ROL_ALUMNO').custom( esRoleValido ),
    validarCampos,
] ,postUsuario);

router.put('/agregarCursoAlumno/:id', [
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeCursoPorId)
] ,postUsuario);

router.put('/editarAlumno/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeUsuarioPorId ),
    check('curso').custom(esCursoValido),
    check('curso2').custom(esCursoValido), 
    check('curso3').custom( esCursoValido ),
    check('curso4', 'Un alumno solo puede registrarse a 3 cursos').isEmpty(), 
    validarCampos
] ,putUsuario);

router.post('/agregar/maestro', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe de ser más de 6 digitos').isLength( { min: 6 } ),
    check('correo', 'El correo no es valido').isEmail(),
    check('correo').custom( emailExiste ),
    check('rol').default('ROL_MAESTRO').custom( esRoleValido ),
    validarCampos,
] ,postUsuario);

router.put('/editar/:id', [
    validarJWT,
    esMaestroRole,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeUsuarioPorId ),
    validarCampos
] ,putUsuario);


router.delete('/eliminarAlumno/:id', [
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeUsuarioPorId ),
    validarCampos
] ,deleteUsuario);


router.delete('/eliminar/:id', [
    validarJWT,
    //esAdminRole,
    tieneRole('ROL_MAESTRO'),
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeUsuarioPorId ),
    validarCampos
] ,deleteUsuario);


module.exports = router;
