import { Router } from 'express';
import { sendMessage, getChats, getMessages, deleteChat ,restoreChat } from "../controllers/chat.controller.js";
import { authUser } from "../middleware/auth.middleware.js";
import multer from "multer";

const chatRouter = Router();

const upload = multer({ dest: "uploads/" });


chatRouter.post("/message", authUser, upload.single("image"), sendMessage)

chatRouter.get("/", authUser, getChats)

chatRouter.get("/:chatId/messages", authUser, getMessages)

chatRouter.delete("/delete/:chatId", authUser, deleteChat)

chatRouter.patch("/restore/:chatId", authUser, restoreChat);

export default chatRouter;