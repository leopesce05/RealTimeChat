import { Socket } from "socket.io";

export const processPrivateMessage = (socket: Socket, data: string) => {
    console.log('Received message:', data);

    //TODO: GUARDAR EL MENSAJE EN LA BASE DE DATOS

    //TODO: ENVIAR EL MENSAJE A TODOS LOS USUARIOS EN LA SALA DE CHAT

    //TODO: ENVIAR EL MENSAJE A TODOS LOS USUARIOS EN LA SALA DE CHAT
}

export const processGroupMessage = (socket: Socket, data: string) => {
    console.log('Received message:', data);

    //TODO: GUARDAR EL MENSAJE EN LA BASE DE DATOS

    //TODO: ENVIAR EL MENSAJE A TODOS LOS USUARIOS EN LA SALA DE CHAT
}