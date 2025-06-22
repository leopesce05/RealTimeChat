import { Server, Socket } from 'socket.io';
import OpenAIService from './services/openai';

export const setupSocketEvents = (io: Server) => {
    // Inicializar OpenAI service
    const openai = new OpenAIService(process.env.OPENAI_API_KEY || '');

    io.on('connection', (socket: Socket) => {
        console.log('A user connected');

        // Event handler para mensajes de chat con IA
        socket.on('chat message', async (data) => {
            try {
                //Reenviar el mensaje al cliente
                socket.emit('chat message', data);


                // Llamada asíncrona a OpenAI
                const aiResponse = await openai.generateResponse(data);

                // Emitir respuesta de la IAå
                socket.emit('chat message',
                    { message: aiResponse }
                );

            } catch (error) {
                console.error('Error en chat-message:', error);

                // Emitir error al cliente
                socket.emit('chat message', {
                    message: 'Error procesando tu mensaje',
                    timestamp: new Date()
                });
            }
        });


        socket.on('disconnect', () => {
            console.log('A user disconnected');
        });
    });
};