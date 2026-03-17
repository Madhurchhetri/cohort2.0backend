import "dotenv/config";
import app from "./src/app.js";
import connectDB from "./src/config/database.js";
// import { testAI } from "./src/services/ai.service.js";
import http from 'http';
import { initSocket } from "./src/sockets/server.socket.js";

const PORT = process.env.PORT || 8000

const httpServer = http.createServer(app)
 initSocket(httpServer)

connectDB()
// testAI()

httpServer.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`);
    
})