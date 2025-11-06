const mongoose = require('mongoose');
require('dotenv').config(); // Load .env

const mongoURI = process.env.MONGO_URI;
const dbName = process.env.DB_NAME;

const connectToMongo = async (retryCount = 0) => {
    const MAX_RETRIES = 3;

    try {
        await mongoose.connect(mongoURI, {
            dbName,
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.info('✅ Connected to Mongo Successfully');
        return;
    } catch (error) {
        console.error(`❌ Connection attempt ${retryCount + 1} failed:`, error);

        if (retryCount + 1 >= MAX_RETRIES) {
            throw new Error('❌ Unable to connect to Mongo!');
        }

        console.info(`Retrying, retry count: ${retryCount + 2}`);
        return await connectToMongo(retryCount + 1);
    }
};

module.exports = connectToMongo;
