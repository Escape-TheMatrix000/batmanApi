const express = require('express');
const app = express();

const batmanRoutes = require('./routes/batmanRoutes');
// Middleware: Permite que tu API pueda entender JSON en las peticiones
app.use(express.json());

// Ruta de prueba: Un saludo simple para verificar que el servidor funciona
app.get('/', (req, res) => {
    res.send('¡Bienvenido a la API de Batman!');
});

// ¡Aquí es donde en el futuro vas a importar y usar tus rutas!
// Por ejemplo:
// const batmanRoutes = require('./routes/batmanRoutes');
//Prefijo '/api/batman'
app.use('/api/batman', batmanRoutes);

module.exports = app;