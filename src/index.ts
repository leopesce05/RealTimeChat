
import app from './server';
import { createServer } from 'http';
import { Server } from 'socket.io';
import colors from 'colors';
import { setupSocketEvents } from './socketIO';

//INICIALIZACION DE SERVIDOR Y SOCKET.IO
const server = createServer(app);
const io = new Server(server);

// Inicializar las rutas de socket.io
setupSocketEvents(io);

//INICIALIZACION DE PUERTO
const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(colors.blue.bold(`Server initialized successfully on port ${PORT}`));
});
