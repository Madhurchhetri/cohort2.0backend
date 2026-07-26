import dotenv from 'dotenv';
dotenv.config();
import app from './app.ts';
import connectDB from './config/db.ts';

const PORT = process.env.PORT

connectDB()

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})