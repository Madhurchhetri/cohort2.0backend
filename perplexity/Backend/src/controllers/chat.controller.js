import { generateResponse, generateChatTitle,analyzeImage  } from "../services/ai.service.js";
import chatModel from "../models/chat.model.js"
import messageModel from "../models/message.model.js";
import { uploadImage } from "../services/cloudinary.service.js";

export async function sendMessage(req, res) {

    const { message,  chatId } = req.body;

    let title = null, chat = null;
     let imageUrl = null;

         if (req.file) {
        const result = await uploadImage(req.file.path);
        imageUrl = result.secure_url;
    }

    if (!chatId) {
        title = await generateChatTitle(message || "Image message");
        chat = await chatModel.create({
            user: req.user.id,
            title
        })
    }

    const currentChatId = chatId || chat._id;

    // 1. save user message
    await messageModel.create({
        chat: currentChatId,
        content: message || "",
        image: imageUrl,
        role: "user"
    })

    // 2. get all messages (sorted ✅)
    const messages = await messageModel
        .find({ chat: currentChatId })
        .sort({ createdAt: 1 })

    try {

           // ✅ FORMAT FOR AI (IMPORTANT)
        const formattedMessages = messages.map(m => ({
            role: m.role,
            content: m.content || ""
        }));

        let result;

                // 🤖 IMAGE AI (PRIORITY)
        if (imageUrl) {
            console.log("🖼️ Image detected, running AI analysis...");

            if (typeof analyzeImage !== "function") {
                 throw new Error("analyzeImage function missing");
            }
            result = await analyzeImage(
                imageUrl,
                message || "Explain this image simply"
            );
        } 
        
        // 💬 NORMAL CHAT
        else {
            result = await generateResponse(formattedMessages);
        }
        // 4. save AI message
        const aiMessage = await messageModel.create({
            chat: currentChatId,
            content: result,
            role: "assistant"
        })

        // 5. response
        res.status(201).json({
            title,
            chat,
            aiMessage
        })

    } catch (error) {

        console.log("🔥 AI ERROR:", error);

        res.status(500).json({
            message: "AI failed",
            error: error.message
        })
    }
}

export async function getChats(req, res) {
    const user = req.user

    const chats = await chatModel.find({ user: user.id, isDeleted: false }).sort({ createdAt: -1 })

    res.status(200).json({
        message: "Chats retrieved successfully",
        chats
    })
}

export async function getMessages(req, res) {
    const { chatId } = req.params;

    const chat = await chatModel.findOne({
        _id: chatId,
        user: req.user.id
    })

    if (!chat) {
        return res.status(404).json({
            message: "Chat not found"
        })
    }

    const messages = await messageModel.find({
        chat: chatId
    }).sort({ createdAt: 1 })

    res.status(200).json({
        message: "Messages retrieved successfully",
        messages
    })
}

// export async function deleteChat(req, res) {

//     const { chatId } = req.params;

//     const chat = await chatModel.findOneAndUpdate({
//         _id: chatId,
//         user: req.user.id
//     })


//     if (!chat) {
//         return res.status(404).json({
//             message: "Chat not found"
//         })
//     }

//     await messageModel.deleteMany({
//         chat: chatId
//     })

//     res.status(200).json({
//         message: "Chat deleted successfully"
//     })
// }

export async function deleteChat(req, res) {

    const { chatId } = req.params;

    const chat = await chatModel.findOneAndUpdate(
        {
            _id: chatId,
            user: req.user.id
        },
        {
            isDeleted: true   // 👈 soft delete
        },
        { new: true }
    )

    if (!chat) {
        return res.status(404).json({
            message: "Chat not found"
        })
    }

    res.status(200).json({
        message: "Chat deleted successfully"
    })
}

export async function restoreChat(req, res) {

    const { chatId } = req.params;

    const chat = await chatModel.findOneAndUpdate(
        {
            _id: chatId,
            user: req.user.id
        },
        {
            isDeleted: false
        },
        { new: true }
    )

    if (!chat) {
        return res.status(404).json({
            message: "Chat not found"
        })
    }

    res.status(200).json({
        message: "Chat restored successfully",
        chat
    })
}