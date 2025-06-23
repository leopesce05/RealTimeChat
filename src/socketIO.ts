import { Server, Socket } from 'socket.io';
import { ioAuth } from './middlewares/auth';
import { joinSelfRoom, processPrivateMessage } from './controllers/socketHandlers/ConnectionHandler';

export const setupSocketEvents = (io: Server) => {


    //Autenticacion por JWT
    io.use(ioAuth);

    io.on('connection', (socket: Socket) => {
        console.log('A user connected');

        //UNIR AL USUARIO A SU SALA DE CHAT
        joinSelfRoom(socket);


        //Handler para mensajes de chat
        socket.on('chat-message', processPrivateMessage);
    
        //TODO: CREAR ESTO
        socket.on('ia-message', async (data) => {
            // Llamada asíncrona a OpenAI
        });


        socket.on('disconnect', () => {
            console.log('A user disconnected');
        });
    });
};