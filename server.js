// server.js (Este será el punto de entrada de tu aplicación)

// Carga las variables de entorno desde el archivo .env
// Es una buena práctica hacerlo lo más pronto posible en tu aplicación.
require('dotenv').config();

// conexion a la DB
const connectDB = require('./src/config/database');

// Importa la aplicación Express que definiremos en src/app.js
const app = require('./src/app');


connectDB();

// Obtiene el puerto desde las variables de entorno, o usa 3000 por defecto
const PORT = process.env.PORT || 3000;

// Inicia el servidor
app.listen(PORT, () => {
    console.log(`Servidor de Batman API escuchando en el puerto ${PORT}`);
    console.log(`Visita: http://localhost:${PORT}`);
});
