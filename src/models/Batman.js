const mongoose = require('mongoose');

const batmanSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },  

    alias: {
        type: String,
        required: true,
        trim: true
    },
    city: {
        type: String,
        required: true,
        trim: true
    },
    habilities: [{
        type: String,
        trim: true
    }],
    mainEnemies: [{
        type: String,
        trim: true
    }],  
}, {
    timestamps: true
});

const Batman = mongoose.model('Batman', batmanSchema);

module.exports = Batman;