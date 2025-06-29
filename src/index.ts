import app from './server';
import { createServer } from 'http';
import { Server } from 'socket.io';
import colors from 'colors';
import { setupSocketEvents } from './socketIO';
import { initializeRepeatableJob } from './queues/queue';

//INICIALIZACION DE SERVIDOR Y SOCKET.IO
const server = createServer(app);
const io = new Server(server);

// Inicializar las rutas de socket.io
setupSocketEvents(io);

//INICIALIZACION DE PUERTO
const PORT = process.env.PORT || 3000;

server.listen(PORT, async () => {
    console.log(colors.blue.bold(`Server initialized successfully on port ${PORT}`));

    try {
        await initializeRepeatableJob();
        console.log(colors.green.bold('✅ Queues and workers initialized successfully'));
    } catch (error) {
        console.error(colors.red.bold('❌ Error initializing queues:'), error);
    }
});
