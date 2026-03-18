import { Server, Socket } from 'socket.io';
import { ioAuth } from './middlewares/auth';
import { joinGroupsRoom, joinSelfRoom } from './controllers/socketHandlers/ConnectionHandler';
import { processPrivateMessage, processGroupMessage } from './controllers/socketHandlers/MessageEventHandler';

export const setupSocketEvents = (io: Server) => {


    //Autenticacion por JWT
    io.use(ioAuth);

    io.on('connection', (socket: Socket) => {
        console.log('A user connected');

        //UNIR AL USUARIO A SU SALA DE CHAT
        joinSelfRoom(socket);

        //UNIR AL USUARIO A SUS GRUPOS
        joinGroupsRoom(socket);


        //Handler para mensajes de chat
        socket.on('chat-message', processPrivateMessage);

        //Handler para mensajes de grupo
        socket.on('group-message', processGroupMessage);
        //TODO: CREAR ESTO
        socket.on('ia-message', async (data) => {
            // Llamada asíncrona a OpenAI
        });


        socket.on('disconnect', () => {
            console.log('A user disconnected');
        });
    });
};