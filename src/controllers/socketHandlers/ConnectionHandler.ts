import { Socket } from "socket.io";

export const joinSelfRoom = (socket: Socket) => {
    //UNIR AL USUARIO A SU SALA DE CHAT
    socket.join(socket.user._id.toString());
}


export const joinGroupsRoom = (socket: Socket) => {
    //UNIR AL USUARIO A SUS GRUPOS
    //TODO: CREAR ESTO
}