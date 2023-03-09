//Importaciones
const { Router } = require("express");
const { check } = require("express-validator");

const {
  deleteCurso,
  putCurso,
  postCurso,
  getCurso,
  putAgregarCurso,
  getCursoPorID,
  getCursoAlumnoPorID,
  getCursoAlumnos,
} = require("../controllers/curso");
const {
  getUsuarios,
  postUsuario,
  putUsuario,
  deleteUsuario,
} = require("../controllers/usuario");

const {
  esRoleValido,
  emailExiste,
  existeUsuarioPorId,
  esCursoValido,
  curso4Valido,
  existeCursoPorId,
  alumnoAsignado,
  numAsignaciones,
  conteoAlumnos,
} = require("../helpers/db-validators");

const { validarCursos, validarAsignacionCursos, validarAlumnoExiste } = require("../middlewares/validar-asignacion");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");
const { tieneRole, esMaestroRole, esAlumnoRole } = require("../middlewares/validar-roles");

const router = Router();

router.get("/mostrarCurso", getCurso);

router.get(
  "/mostrarCursosMaestro",
  validarJWT,
  esMaestroRole,
  validarCampos,
  getCursoPorID
);

router.get(
  "/mostrarCursosAlumno", [
  validarJWT,
  validarCampos],
  getCursoAlumnos);

router.post(
  "/agregar/curso",
  [
    validarJWT,
    esMaestroRole,
    //tieneRole('ROL_MAESTRO'),
    check("curso", "El curso es obligatorio").not().isEmpty(),
    validarCampos,
  ],
  postCurso
);

router.put(
  "/editarCurso/:id",
  [
    validarJWT,
    esMaestroRole,
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(existeCursoPorId),
    validarCampos,
  ],
  putCurso
);

router.put('/agregarCurso/:id', [
    validarJWT,
    tieneRole("ROL_ALUMNO"),
    check('id', 'No es un id de Mongo VÃ¡lido').isMongoId(),
    check('id').custom(existeCursoPorId),
    validarAsignacionCursos,
    validarCampos,
    //validarAlumnoExiste,
], putAgregarCurso);

router.delete(
  "/eliminarCurso/:id",
  [
    validarJWT,
    tieneRole("ROL_MAESTRO"),
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(existeCursoPorId),
    validarCampos,
  ],
  deleteCurso
);

module.exports = router;