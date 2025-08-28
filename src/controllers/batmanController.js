// src/controllers/batmanController.js

// Importamos el modelo de Batman (necesario para interactuar con la DB)
const Batman = require('../models/Batman');
const Villain = require('../models/Villain'); // También el de Villano para futuras rutas

// Datos estáticos para gadgets (si aún no los quieres mover a la DB)
const BATMAN_INFO_STATIC = {
    gadgets: [
        { id: 1, nombre: "Batarang", uso: "Ataque a distancia, desactivación" },
        { id: 2, nombre: "Batclaw", uso: "Movimiento, agarre" },
        { id: 3, nombre: "Cinturón de herramientas", uso: "Almacenamiento de gadgets" },
        { id: 4, nombre: "Batmovil", uso: "Transporte, combate" },
        { id: 5, nombre: "Grapple Gun", uso: "Movimiento vertical" }
    ]
};


/**
 * Obtiene la información de Batman desde la base de datos.
 */
exports.getBatman = async (req, res) => {
    try {
        const batmanData = await Batman.findOne();

        if (!batmanData) {
            return res.status(404).json({ message: 'Información de Batman no encontrada en la base de datos.' });
        }
        res.json(batmanData);
    } catch (error) {
        console.error('Error al obtener la información de Batman:', error);
        res.status(500).json({ message: 'Error interno del servidor.' });
    }
};

/**
 * Crea o actualiza la información de Batman en la base de datos.
 */
exports.createBatman = async (req, res) => { // ¡Esta es la función que faltaba!
    try {
        const { nombre, alias, ciudad, habilidades, enemigosPrincipales } = req.body;
        let batman = await Batman.findOne();

        if (batman) {
            // Si ya existe, actualizamos
            Object.assign(batman, { nombre, alias, ciudad, habilidades, enemigosPrincipales });
            await batman.save();
            return res.status(200).json({ message: 'Información de Batman actualizada exitosamente.', data: batman });
        } else {
            // Si no existe, creamos
            batman = new Batman({ nombre, alias, ciudad, habilidades, enemigosPrincipales });
            await batman.save();
            return res.status(201).json({ message: 'Información de Batman creada exitosamente.', data: batman });
        }
    } catch (error) {
        console.error('Error al crear/actualizar la información de Batman:', error);
        res.status(400).json({ message: 'Error al procesar la solicitud.', error: error.message });
    }
};

exports.getAllVillains = async (req, res) => {
    try {
        const villains = await Villain.find();
        res.json(villains);
    } catch (error) {
        console.error('Error al obtener los villanos:', error);
        res.status(500).json({ message: 'Error interno del servidor.' });
    }
};

exports.getVillainByName = async (req, res) => {
    try {
        const villains = await Villain.find({ mainEnemies: 'Batman' });
        res.json(villains);
    } catch (error) {
        console.error('Error al obtener los villanos de Batman:', error);
        res.status(500).json({ message: 'Error interno del servidor.' });
    }
};

exports.createVillain = async (req, res) => {
    try {
        const {name, alias, description, habilities, mainEnemies} = req.body;
        const existingVillain = await Villain.findOne({ name });
        if (existingVillain){
            return res.status(400).json({message: `El villano '${name}' ya existe...`})

        }
        const newVillain = new Villian({
            name,
            alias,
            description,
            habilities,
            mainEnemies
        });
        await newVillian.save();
        res.status(201).json({message: 'Villano creado', data: newVillain})
    } catch (error) {
        console.error('Error al crear el villano:', error);
        res.status(400).json({ message: 'Error al procesar la solicitud.', error: error.message });
    }
};

exports.updateVillain = async (req, res) => {
    try {
        const villainId = req.params.id;
        const updatedData = req.body;
        const villain = await Villain.findyIdAndUpdate(villainId. updateData, {

        });
        if (!villain) {
            return res.status(404).json({message: 'Villano no encontrado para actualizar'});

        }
        res.status(200).json({message: 'Villano actualizado', data: villain});
    } catch (error) {
        console.error('Error al actualizar el villano:', error);
        res.status(400).json({ message: 'Error al procesar la solicitud.', error: error.message });
    }
};

exports.deleteVillain = async (req, res) => {
    try {
        const villainId = req.params.id
        const villain = await Villain.findByIdAndDelete(villainId);

        if (!villain) {
            return res.status(404).json({message: 'Villano no encontrado para eliminar'})
        }
        res.status(200).json({message: 'Villano eliminado', data: villain});
    } catch (error) {
        console.error('Error al eliminar el villano:', error);
        res.status(500).json({ message: 'Error al procesar la solicitud.', error: error.message });
    }
}

// Puedes dejar las funciones de gadgets estáticas por ahora o moverlas a la DB si creas un modelo.
exports.getBatmanGadgets = (req, res) => {
    res.json(BATMAN_INFO_STATIC.gadgets);
};

exports.getGadgetById = (req, res) => {
    const gadget = BATMAN_INFO_STATIC.gadgets.find(g => g.id === parseInt(req.params.id));
    if (gadget) {
        res.json(gadget);
    } else {
        res.status(404).json({ message: `Gadget con ID '${req.params.id}' no encontrado.` });
    }
};
