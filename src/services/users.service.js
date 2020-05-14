const bcrypt = require('bcrypt');
const jwtAuth = require('../../shared/passport');

const User = require('../models/user');

module.exports = {

    async singUp(username, password) {
        const user = new User();
        const salt = await bcrypt.genSalt(10);
        
        user.username = username;
        user.password = await this.hashPassword(password, salt);
        
        try { 
           return await user.save();
        } catch (error) {
            if (error.code == 11000)
                throw new Error('User already exists.');
            
            throw new Error('Internal Error');
        }
    }, 

    async authenticate (username, password, callback) {
        const user = await this.validateUserPassword(username, password);
        
        if (user && user.username) {
            const payload = {
                username : user.username
            }

            jwtAuth.sign(payload, (err, token) => {
                callback(err, token);
            });
        } else {
            
            callback("Invalid credentials", null);
        }
    },

    async validateUserPassword(username, password){
        
        const user = await User.findOne({username});
        
        if (user && await bcrypt.compare(password, user.password)){
            return user;
        } else {
            return null;
        }
    },

    async hashPassword (password, salt) {
        return await bcrypt.hash(password, salt);
    },

    async getByUsername (username) {
        const user = await User.findOne({ username });

        return result;
    },

    async getUsers (){
        const list = await User.find();
       
        return list;
    }
}