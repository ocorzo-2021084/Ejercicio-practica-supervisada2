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
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }
});


module.exports = model('Curso', CursoSchema);