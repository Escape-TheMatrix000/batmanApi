// src/controllers/batmanController.js

// Importamos los modelos necesarios para interactuar con la DB
const Batman = require('../models/Batman');
const Villain = require('../models/Villain');

// Datos estáticos para gadgets (los mantenemos así por ahora)
const BATMAN_INFO_STATIC = {
    gadgets: [
        { id: 1, nombre: "Batarang", uso: "Ataque a distancia, desactivación" },
        { id: 2, nombre: "Batclaw", uso: "Movimiento, agarre" },
        { id: 3, nombre: "Cinturón de herramientas", uso: "Almacenamiento de gadgets" },
        { id: 4, nombre: "Batmovil", uso: "Transporte, combate" },
        { id: 5, nombre: "Grapple Gun", uso: "Movimiento vertical" }
    ]
};


// ----------------------------------------------------------------------
// FUNCIONES CRUD PARA BATMAN (USANDO LA BASE DE DATOS)
// ----------------------------------------------------------------------

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
exports.createBatman = async (req, res) => {
    try {
        // ¡CAMBIADO! Ahora desestructuramos con 'name', 'city', 'habilities', 'mainEnemies'
        const { name, alias, city, habilities, mainEnemies } = req.body;
        let batman = await Batman.findOne();

        if (batman) {
            // Si ya existe, actualizamos
            // ¡CAMBIADO! Usamos los nombres de campos en inglés
            Object.assign(batman, { name, alias, city, habilities, mainEnemies });
            await batman.save();
            return res.status(200).json({ message: 'Información de Batman actualizada exitosamente.', data: batman });
        } else {
            // Si no existe, creamos
            // ¡CAMBIADO! Usamos los nombres de campos en inglés
            batman = new Batman({ name, alias, city, habilities, mainEnemies });
            await batman.save();
            return res.status(201).json({ message: 'Información de Batman creada exitosamente.', data: batman });
        }
    } catch (error) {
        console.error('Error al crear/actualizar la información de Batman:', error);
        res.status(400).json({ message: 'Error al procesar la solicitud.', error: error.message });
    }
};


// ----------------------------------------------------------------------
// FUNCIONES CRUD PARA VILLANOS (USANDO LA BASE DE DATOS)
// ----------------------------------------------------------------------

/**
 * Obtiene todos los villanos de la base de datos.
 */
exports.getAllVillains = async (req, res) => {
    try {
        const villains = await Villain.find();
        res.json(villains);
    } catch (error) {
        console.error('Error al obtener todos los villanos:', error);
        res.status(500).json({ message: 'Error interno del servidor.' });
    }
};

/**
 * Obtiene un villano específico por su nombre desde la base de datos.
 * Utiliza un regex para búsqueda insensible a mayúsculas/minúsculas.
 */
exports.getVillainByName = async (req, res) => {
    try {
        const nombreVillano = req.params.nombreVillano;
        const villain = await Villain.findOne({ nombre: { $regex: new RegExp(`^${nombreVillano}$`, 'i') } });

        if (!villain) {
            return res.status(404).json({ message: `Villano '${req.params.nombreVillano}' no encontrado.` });
        }
        res.json(villain);
    } catch (error) {
        console.error('Error al obtener villano por nombre:', error);
        res.status(500).json({ message: 'Error interno del servidor.' });
    }
};

/**
 * Crea un nuevo villano en la base de datos.
 */
exports.createVillain = async (req, res) => {
    try {
        const { nombre, alias, descripcion, habilidades, enemigoPrincipal } = req.body;

        const existingVillain = await Villain.findOne({ nombre });
        if (existingVillain) {
            return res.status(409).json({ message: `El villano '${nombre}' ya existe.` }); // 409 Conflict
        }

        const newVillain = new Villain({
            nombre,
            alias,
            descripcion,
            habilidades,
            enemigoPrincipal
        });

        await newVillain.save();
        res.status(201).json({ message: 'Villano creado exitosamente.', data: newVillain });
    } catch (error) {
        console.error('Error al crear villano:', error);
        res.status(400).json({ message: 'Error al procesar la solicitud.', error: error.message });
    }
};

/**
 * Actualiza un villano existente en la base de datos por su ID.
 */
exports.updateVillain = async (req, res) => {
    try {
        const villainId = req.params.id;
        const updatedData = req.body;

        const villain = await Villain.findByIdAndUpdate(villainId, updatedData, {
            new: true, // Devuelve el documento actualizado
            runValidators: true // Corre las validaciones del esquema al actualizar
        });

        if (!villain) {
            return res.status(404).json({ message: 'Villano no encontrado para actualizar.' });
        }
        res.status(200).json({ message: 'Villano actualizado exitosamente.', data: villain });
    } catch (error) {
        console.error('Error al actualizar villano:', error);
        res.status(400).json({ message: 'Error al actualizar el villano.', error: error.message });
    }
};

/**
 * Elimina un villano de la base de datos por su ID.
 */
exports.deleteVillain = async (req, res) => {
    try {
        const villainId = req.params.id;
        const villain = await Villain.findByIdAndDelete(villainId);

        if (!villain) {
            return res.status(404).json({ message: 'Villano no encontrado para eliminar.' });
        }
        res.status(200).json({ message: 'Villano eliminado exitosamente.', data: villain });
    } catch (error) {
        console.error('Error al eliminar villano:', error);
        res.status(500).json({ message: 'Error al eliminar el villano.', error: error.message });
    }
};


// ----------------------------------------------------------------------
// FUNCIONES PARA GADGETS (MANTENEMOS ESTÁTICAS POR AHORA)
// ----------------------------------------------------------------------

/**
 * Obtiene la lista de gadgets de Batman (estático).
 */
exports.getBatmanGadgets = (req, res) => {
    res.json(BATMAN_INFO_STATIC.gadgets);
};

/**
 * Obtiene un gadget específico por su ID (estático).
 */
exports.getGadgetById = (req, res) => {
    const gadget = BATMAN_INFO_STATIC.gadgets.find(g => g.id === parseInt(req.params.id));
    if (gadget) {
        res.json(gadget);
    } else {
        res.status(404).json({ message: `Gadget con ID '${req.params.id}' no encontrado.` });
    }
};
