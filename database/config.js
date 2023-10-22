const mongoose = require('mongoose');

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.DB_CONNECT)
        console.log('db online')
    } catch (error) {
        console.error(error);
        throw new Error('No ha sido posible conectarse')
    }
}

module.exports = {
    dbConnection
};