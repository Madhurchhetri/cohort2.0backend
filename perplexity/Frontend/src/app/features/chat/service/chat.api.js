import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000",
    withCredentials: true,
})


export const sendMessage = async ({ message, chatId ,image, file }) => {
    const formData = new FormData();

    formData.append("message", message);
    if (chatId) formData.append("chatId", chatId);
    if (image) formData.append("image", image);
    if (file) formData.append("file", file);

    const response = await api.post("/api/chats/message",formData);
    return response.data
}

export const getChats = async () => {
    const response = await api.get("/api/chats")
    return response.data
}

export const getMessages = async (chatId) => {
    const response = await api.get(`/api/chats/${chatId}/messages`)
    return response.data
}

export const deleteChat = async (chatId) => {
    const response = await api.delete(`/api/chats/delete/${chatId}`)
    return response.data
}

export const restoreChat = async (chatId) => {
    const response = await api.patch(`/api/chats/restore/${chatId}`)
    return response.data
}