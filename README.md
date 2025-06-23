# 💬 ChatProject - Chat en Tiempo Real con IA

Un sistema de chat en tiempo real construido con Node.js, Socket.IO, MongoDB y OpenAI, que permite comunicación grupal, mensajes privados e integración con inteligencia artificial.

## 🚀 Características

### ✨ Funcionalidades Principales
- **Chat en tiempo real** con Socket.IO
- **Múltiples chats grupales** dinámicos
- **Mensajes privados** entre usuarios
- **Integración con OpenAI** para respuestas automáticas
- **Sistema de autenticación** JWT
- **Gestión de usuarios** y contactos
- **Indicadores de escritura** en tiempo real
- **API RESTful** completa

### 🔧 Tecnologías Utilizadas
- **Backend**: Node.js, Express.js, TypeScript
- **Base de Datos**: MongoDB con Mongoose
- **Tiempo Real**: Socket.IO
- **Autenticación**: JWT (JSON Web Tokens)
- **IA**: OpenAI API
- **Validación**: Express-validator
- **Hashing**: bcryptjs

## 📋 Requisitos Previos

- Node.js (v16 o superior)
- MongoDB (local o MongoDB Atlas)
- Cuenta de OpenAI (para funcionalidades de IA)

## 🛠️ Instalación

1. **Clonar el repositorio**
```bash
git clone https://github.com/leopesce05/RealTimeChat.git
cd RealTimeChat
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar variables de entorno**
Crear un archivo `.env` en la raíz del proyecto:
```env
# MongoDB
MONGODB_URI=mongodb+srv://usuario:password@cluster.mongodb.net/nombre_base_datos?retryWrites=true&w=majority

# JWT
JWT_SECRET=tu_secreto_super_seguro_aqui

# OpenAI
OPENAI_API_KEY=tu_api_key_de_openai

# Puerto del servidor
PORT=3000
```

4. **Ejecutar el servidor**
```bash
npm run dev
```

## 📡 API Endpoints

### 🔐 Autenticación
```
POST /auth/register     - Registrar nuevo usuario
POST /auth/login        - Iniciar sesión
```

### 👤 Usuarios
```
GET    /user            - Obtener perfil del usuario
PUT    /user            - Actualizar perfil
GET    /user/contacts   - Obtener contactos
POST   /user/contacts/:id - Agregar contacto
DELETE /user/contacts/:id - Eliminar contacto
```

### 🗄️ API REST (Legacy)
```
GET    /api/users       - Obtener todos los usuarios
GET    /api/users/:id   - Obtener usuario por ID
POST   /api/users       - Crear usuario
PUT    /api/users/:id   - Actualizar usuario
DELETE /api/users/:id   - Eliminar usuario
POST   /api/users/login - Login de usuario
```

## 🔌 Socket.IO Events

### 📨 Eventos del Cliente
```javascript
// Unirse a un chat
socket.emit('join-chat', { chatId: 'general', userId: '123' });

// Salir de un chat
socket.emit('leave-chat', { chatId: 'general', userId: '123' });

// Enviar mensaje grupal
socket.emit('send-message', {
    chatId: 'general',
    userId: '123',
    username: 'juan',
    message: 'Hola a todos!'
});

// Mensaje privado
socket.emit('private-message', {
    toUserId: '456',
    fromUserId: '123',
    message: 'Hola en privado'
});

// Indicadores de escritura
socket.emit('typing-start', { chatId: 'general', userId: '123', username: 'juan' });
socket.emit('typing-stop', { chatId: 'general', userId: '123' });
```

### 📨 Eventos del Servidor
```javascript
// Confirmación de unirse al chat
socket.on('joined-chat', (data) => { /* ... */ });

// Nuevo mensaje
socket.on('new-message', (data) => { /* ... */ });

// Usuario escribiendo
socket.on('user-typing', (data) => { /* ... */ });

// Mensaje privado
socket.on('private-message', (data) => { /* ... */ });

// Errores
socket.on('error', (data) => { /* ... */ });
```

## 🏗️ Estructura del Proyecto

```
src/
├── config/
│   └── database.ts          # Configuración de MongoDB
├── controllers/
│   └── UserHandlers.ts      # Controladores de usuarios
├── middlewares/
│   ├── handleInputErrors.ts # Validación de entrada
│   └── user.ts             # Middlewares de usuario
├── models/
│   └── User.ts             # Modelo de usuario
├── router/
│   └── AuthRouter.ts       # Rutas de autenticación
├── utils/
│   ├── auth.ts             # Utilidades de autenticación
│   └── jwt.ts              # Manejo de JWT
├── index.html              # Página principal del chat
├── index.ts                # Punto de entrada
├── router.ts               # Rutas principales
├── server.ts               # Configuración del servidor
└── socketIO.ts             # Configuración de Socket.IO
```

## 🎯 Ejemplos de Uso

### 🔐 Registro de Usuario
```bash
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "juan",
    "email": "juan@email.com",
    "password": "12345678"
  }'
```

### 🔑 Login
```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "juan@email.com",
    "password": "12345678"
  }'
```

### 💬 Cliente JavaScript
```javascript
import { io } from 'socket.io-client';

const socket = io('http://localhost:3000');

// Unirse a un chat
socket.emit('join-chat', { chatId: 'general', userId: '123' });

// Enviar mensaje
socket.emit('send-message', {
    chatId: 'general',
    userId: '123',
    username: 'juan',
    message: '¡Hola a todos!'
});

// Escuchar mensajes
socket.on('new-message', (data) => {
    console.log(`${data.username}: ${data.message}`);
});
```

## 🔒 Seguridad

- **Contraseñas hasheadas** con bcrypt
- **Autenticación JWT** para sesiones
- **Validación de entrada** con express-validator
- **Sanitización** de datos de entrada
- **Manejo de errores** robusto

## 🚀 Despliegue

### Heroku
```bash
# Configurar variables de entorno en Heroku
heroku config:set MONGODB_URI=tu_uri_de_mongodb
heroku config:set JWT_SECRET=tu_secreto_jwt
heroku config:set OPENAI_API_KEY=tu_api_key_openai

# Desplegar
git push heroku main
```

### Vercel
```bash
# Instalar Vercel CLI
npm i -g vercel

# Desplegar
vercel
```

## 🧪 Testing

```bash
# Ejecutar tests (si están configurados)
npm test

# Ejecutar en modo desarrollo
npm run dev

# Ejecutar en producción
npm start
```

## 📊 Monitoreo

El servidor incluye:
- **Logs detallados** de conexiones
- **Estadísticas de Socket.IO** en tiempo real
- **Manejo de errores** con stack traces
- **Métricas de rendimiento**

## 🤝 Contribuir

1. Fork el proyecto
2. Crear una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 👨‍💻 Autor

**Leo Pesce**
- GitHub: [@leopesce05](https://github.com/leopesce05)
- Proyecto: [RealTimeChat](https://github.com/leopesce05/RealTimeChat)

## 🙏 Agradecimientos

- [Socket.IO](https://socket.io/) por la funcionalidad en tiempo real
- [OpenAI](https://openai.com/) por la API de inteligencia artificial
- [MongoDB](https://www.mongodb.com/) por la base de datos
- [Express.js](https://expressjs.com/) por el framework web

---

⭐ Si te gusta este proyecto, ¡dale una estrella en GitHub!