API de Batman

Este es un proyecto de API RESTful para gestionar información sobre Batman, sus villanos y gadgets.

## Tecnologías Utilizadas
* Node.js
* Express.js
* MongoDB Atlas (Base de datos en la nube)
* Mongoose (ODM para Node.js y MongoDB)
* dotenv (Variables de entorno)

## Cómo Ejecutar
1.  Asegúrate de tener Node.js instalado.
2.  Navega a la carpeta raíz del proyecto en tu terminal.
3.  Instala las dependencias: `npm install`
4.  Crea un archivo `.env` en la raíz del proyecto con tus variables `PORT` y `MONGO_URI`.
5.  Inicia el servidor: `node server.js`

## Endpoints de Ejemplo
* `GET /api/batman` - Obtiene la información de Batman.
* `POST /api/batman` - Crea/Actualiza la información de Batman.
* `GET /api/batman/villains` - Obtiene la lista de villanos.
* `POST /api/batman/villains` - Crea un nuevo villano.
* `GET /api/batman/villains/:nombreVillano` - Obtiene un villano específico.
* ... y más por explorar.

