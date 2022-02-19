const mongoose = require("mongoose")
const logger = require('../../logger/logger')

const connection = async () => {
    try {
        await mongoose.connect(process.env.DB_URI,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });
        logger.log('Connected to the Database!!', 0)

    } catch (err) {
        logger.log('Database Connection failed: '+ err.message, 0)
    }
};

module.exports = connection