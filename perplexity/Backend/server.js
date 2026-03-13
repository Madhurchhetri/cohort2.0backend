import "dotenv/config";
import app from "./src/app.js";
import connectDB from "./src/config/database.js";
import { testAI } from "./src/services/ai.service.js";

const PORT = process.env.PORT || 8000

connectDB()
testAI()

app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`);
    
})