const { Schema, model } = require('mongoose');

const CursoSchema = Schema({
    curso: {
        type: String,
        required: [true , 'El curso es obligatorio']
    },
    estado: {
        type: Boolean,
        default: true
    },
});


module.exports = model('Curso', CursoSchema);