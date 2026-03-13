const mongoose = require('mongoose');

function connectDatabase() {
    mongoose.connect(process.env.MONGO_URI).then(() => {
        console.log('Database connected successfully');
    })
}

module.exports = connectDatabase;