const mongoose = require('mongoose');
const DB_PATH = process.env.DB_PATH;
module.exports.connectWithDatabase = async () => {
    try {
        const connection = await mongoose.connect(DB_PATH);
        console.log(`Connected with Database : ${connection.connection.host}`);
    } catch (error) {
        
        console.log(error.message);
        process.exit(1);
    }
};