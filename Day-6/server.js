const app = require('./src/app')

const mongoose = require('mongoose')

function connectToDB() {
    mongoose.connect('mongodb+srv://madhur:nDr0fVXI6TbDzaXC@cluster0.wmjyh4k.mongodb.net/Day-6').then(()=>{
        console.log("server is connected to database");
        
    })
}
connectToDB()

app.listen(3000, () => {
    console.log('Server is running on port 3000')
})