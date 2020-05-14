const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    username: {
        type: String,
        unique: true, 
        required : true
    },
    password: {
        type: String,
    }
})

module.exports = mongoose.model('user', schema);