const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    correo: {
        type: String,
        required: [true, 'El correo es obligatorio' ],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'El password es obligatorio' ]
    },
    img: {
        type: String
    },
    rol: {
        type: String,
        required: true,
    },
    curso: {
        type: String,
        required: true,
    },
    curso2: {
        type: String,      
    },
    curso3: {
        type: String,    
    },
    curso4: {
        type: String,
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
});


module.exports = model('Usuario', UsuarioSchema);