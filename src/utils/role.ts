import { IChatMembership } from "../models/ChatMembership";

export const isAdmin = (chatMembership: IChatMembership) => {
    return chatMembership.role === "admin";
}