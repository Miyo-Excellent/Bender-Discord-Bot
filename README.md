# Bender Bot

Bender Bot es un bot para Discord desarrollado por [Miyo-Excellent](https://github.com/Miyo-Excellent) utilizando TypeScript y Node.js. El bot está diseñado para proporcionar una amplia variedad de comandos útiles y divertidos para los usuarios de Discord.

## Dependencias

El repositorio de Bender Bot tiene un archivo `package.json` que enumera todas las dependencias y devDependencies que se utilizaron para desarrollar el bot. A continuación se muestra un resumen de las dependencias principales:

### Dependencias

- [discord.js](https://www.npmjs.com/package/discord.js): Biblioteca para interactuar con la API de Discord.
- [dotenv](https://www.npmjs.com/package/dotenv): Biblioteca para cargar variables de entorno desde un archivo `.env`.
- [mongodb](https://www.npmjs.com/package/mongodb): Biblioteca para interactuar con bases de datos MongoDB.
- [winston](https://www.npmjs.com/package/winston): Biblioteca para registrar mensajes de registro en diferentes niveles.

### DevDependencies

- [nodemon](https://www.npmjs.com/package/nodemon): Herramienta que se utiliza para desarrollar aplicaciones basadas en Node.js reiniciando automáticamente la aplicación cuando se detectan cambios en el archivo.
- [typescript](https://www.npmjs.com/package/typescript): Lenguaje de programación que extiende JavaScript al agregar tipos estáticos.

## Patrones de Diseño
El repositorio de Bender Bot sigue el patrón de arquitectura Modelo-Vista-Controlador (MVC). A continuación se muestra una descripción general de los archivos en cada una de las carpetas del proyecto:

### Modelo
- `/src/models`: Carpeta que contiene los esquemas de los modelos de la base de datos.

### Vista
- `/src/locales`: Carpeta que contiene archivos JSON para la localización del bot.
- `/src/views`: Carpeta que contiene archivos para el formato y visualización de las respuestas.

### Controlador
- `/src/commands`: Carpeta que contiene todos los comandos disponibles en el bot.
- `/src/controllers`: Carpeta que contiene los controladores para los comandos.
- `/src/events`: Carpeta que contiene los controladores de eventos.

## Funciones, Clases, Interfaces y Tipos
El repositorio de Bender Bot utiliza una variedad de funciones, clases, interfaces y tipos. A continuación se muestra una descripción general de cada uno de ellos:

### Funciones
- `connectDB()`: Función que se utiliza para conectarse a una base de datos MongoDB.
- `setupLogger()`: Función que se utiliza para configurar y crear un logger utilizando la biblioteca Winston.

### Clases
- `Command`: Clase base para todos los comandos disponibles en el bot.
- `MongoDBProvider`: Clase que se utiliza para conectarse a una base de datos MongoDB y proporcionar un objeto de conexión a los controladores.

### Interfaces
- `CommandOptions`: Interfaz que se utiliza para definir las opciones de los comandos.
- `EventOptions`: Interfaz que se utiliza para definir las opciones de los eventos.

### Tipos
- `CommandMessage`: Tipo que se utiliza para definir los mensajes enviados por los comandos.
- `CommandArgs`: Tipo que se utiliza para definir los argumentos de los comandos.

## Contribuir

Si deseas contribuir a Bender Bot, ¡estamos encantados de recibir tus pull requests! Aseg

## Uso
Para usar BenderBot en tu proyecto de Discord, sigue los siguientes pasos:

 1. Clona el repositorio con git clone https://github.com/Miyo-Excellent/benderBot.git
 2. Instala las dependencias con npm install
 3. Configura el archivo .env con tus credenciales de Discord y tus preferencias de configuración
 4. Inicia el bot con npm run start

## Contribuciones
Si quieres contribuir a BenderBot, puedes seguir los siguientes pasos:

 1. Haz un fork del repositorio
 2. Crea una nueva rama con la funcionalidad que quieres agregar o la corrección que quieres hacer
 3. Realiza los cambios necesarios y haz commit de tus cambios
 4. Haz un pull request a la rama main del repositorio original

## Licencia
BenderBot está disponible bajo la licencia MIT. Ver el archivo LICENSE para más detalles.

## Contacto
Si tienes alguna pregunta o sugerencia, puedes contactar al desarrollador en su perfil de GitHub: Miyo-Excellent

## Créditos
BenderBot ha sido desarrollado por Miyo-Excellent con la ayuda de las siguientes dependencias:

 - `discord.js` para la interacción con la API de Discord
 - `dotenv` para el manejo de variables de entorno
 - `mongoose` para la conexión con una base de datos MongoDB
 - `winston` para el registro de eventos y errores del bot
 - `joi` para la validación de los datos de configuración
 - `axios` para realizar peticiones HTTP a otras APIs
 - `moment` para el manejo de fechas y horas

## Agradecimientos
Se agradece a la comunidad de desarrolladores de software libre por su constante contribución y apoyo a la comunidad. También se agradece a los desarrolladores de las dependencias utilizadas en este proyecto por su excelente trabajo y dedicación.