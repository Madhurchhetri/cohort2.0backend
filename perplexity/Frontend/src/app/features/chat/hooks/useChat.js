import { initializeSocketConnection } from "../service/chat.socket";
import { sendMessage, getChats, getMessages, deleteChat , restoreChat} from "../service/chat.api";
import { setChats, setCurrentChatId, setError, setLoading, createNewChat, addNewMessage, addMessages ,deleteChatById,restoreChatById } from "../chat.slice";
import { useDispatch } from "react-redux";


export const useChat = () => {

    const dispatch = useDispatch()


    async function handleSendMessage({ message, chatId , image, file}) {
        dispatch(setLoading(true))
        const data = await sendMessage({ message, chatId , image, file })
        const { chat, aiMessage } = data

        const currentChatId = chatId || chat._id

         // ✅ sirf new chat pe title create hoga
       if (!chatId) {
        dispatch(createNewChat({
            chatId: chat._id,
            title: chat.title,
        }))
    }

        dispatch(addNewMessage({
            chatId: currentChatId,
            content: message,
            role: "user",
            image: image ? URL.createObjectURL(image) : null,
        }))
        dispatch(addNewMessage({
            chatId: currentChatId,
            content: aiMessage.content,
            role: aiMessage.role,
        }))
        dispatch(setCurrentChatId(currentChatId))
    }

    async function handleGetChats() {
        dispatch(setLoading(true))
        const data = await getChats()
        const { chats } = data
        dispatch(setChats(chats.reduce((acc, chat) => {
            acc[ chat._id ] = {
                id: chat._id,
                title: chat.title,
                messages: [],
                lastUpdated: chat.updatedAt,
            }
            return acc
        }, {})))
        dispatch(setLoading(false))
    }

    async function handleOpenChat(chatId) {

        const data = await getMessages(chatId)
        const { messages } = data

        const formattedMessages = messages.map(msg => ({
            content: msg.content,
            role: msg.role,
            image: msg.image || null
        }))
        dispatch(addMessages({
            chatId,
            messages: formattedMessages,
        }))
        dispatch(setCurrentChatId(chatId))
    }

    function handleNewChat() {
    dispatch(setCurrentChatId(null))
}

async function handleDeleteChat(chatId) {
    try {
        dispatch(setLoading(true));

        await deleteChat(chatId); // API call

        dispatch(deleteChatById(chatId)); // redux update

        dispatch(setLoading(false));

    } catch (error) {
        dispatch(setError("Failed to delete chat"));
    }
}

async function handleRestoreChat(chatId) {
    try {
        dispatch(setLoading(true));

        const data = await restoreChat(chatId);

        dispatch(restoreChatById(data.chat)); // redux me wapas add

        dispatch(setLoading(false));

    } catch (error) {
        dispatch(setError("Failed to restore chat"));
    }
}

    return {
        initializeSocketConnection,
        handleSendMessage,
        handleGetChats,
        handleOpenChat,
        handleNewChat,
        handleDeleteChat,
        handleRestoreChat,
    }

}