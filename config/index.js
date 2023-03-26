const mongooseConfig = require('./mongoose.config');
const passortConfig = require('./passport.config');
module.exports = {
    connectWithMongoDB: mongooseConfig,
    connectWithPassport: passortConfig
}