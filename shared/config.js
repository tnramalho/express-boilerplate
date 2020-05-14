module.exports = {
    db: {
        mongoURI: {
            DEVELOPMENT: process.env.ENV ||'mongodb+srv://admin:admin@cluster0-zbmz9.mongodb.net/test?retryWrites=true&w=majority',
            PRODUCTION: process.env.ENV
        }
    },
    passport: {
        secretKey: 'secretKey',
        expiresIn: 36000,
    }
}