const connectToMongo = require('./db');

connectToMongo()
    .then(() => console.log('🎉 Test connection successful!'))
    .catch(err => console.error('❌ Test connection failed:', err));
