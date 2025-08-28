// src/models/Villain.js

const mongoose = require('mongoose');

// Definimos el esquema del Villano
const villainSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true // Los villanos también deberían tener nombres únicos
    },
    alias: {
        type: String,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    habilities: [{
        type: String,
        trim: true
    }],
    mainEnemies: { // Podemos relacionarlo con Batman, o simplemente un campo de texto
        type: String,
        trim: true,
        default: 'Batman'
    },
}, {
    timestamps: true
});

const Villain = mongoose.model('Villain', villainSchema);

module.exports = Villain;
