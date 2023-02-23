//Importaciones
const { Router } = require('express');
const { check } = require('express-validator');
const { deleteCurso, putCurso, postCurso, getCurso } = require('../controllers/curso');
const { getUsuarios, postUsuario, putUsuario, deleteUsuario } = require('../controllers/usuario');
const { esRoleValido, emailExiste, existeUsuarioPorId, esCursoValido, curso4Valido, existeCursoPorId } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { tieneRole, esMaestroRole } = require('../middlewares/validar-roles');

const router = Router();

router.get('/mostrarCurso', getCurso);

router.post('/agregar/curso', [
    validarJWT,
    esMaestroRole,
    //tieneRole('ROL_MAESTRO'),
    check('curso', 'El curso es obligatorio').not().isEmpty(),
    validarCampos,
] ,postCurso);



router.put('/editarCurso/:id', [
    validarJWT,
    esMaestroRole,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeCursoPorId ),
    validarCampos
] ,putCurso);


router.delete('/eliminarCurso/:id', [
    validarJWT,
    tieneRole('ROL_MAESTRO'),
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeCursoPorId ),
    validarCampos
] ,deleteCurso);


module.exports = router;




// ROUTES