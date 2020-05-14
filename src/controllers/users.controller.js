const userService = require('../services/users.service');
const passport = require('passport');

module.exports ={

    async signUp (req, res) {

        const { username, password }  = req.body;

        try {
            const user = await userService.singUp(username, password);

            delete user.password;

            res.json(user);
        } catch (err) {

            res.status(400).send({ error: err.message } );

        }
    },

    async signIn (req, res) {
        const { username, password }  = req.body;

        await userService.authenticate(username, password,
            (err, token) => {

                if (err)  res.status(401).json({ error: err});

                 res.json({
                    token: `Bearer ${token}`
                })
        })
    },

    async getUser (req, res) {
        const id = req.params.id;

        let user = await userService.getUser(id);

        return res.json(user);
    },

    async getUsers (req, res) {

        let list = await userService.getUsers();

        return res.json(list);
    }
}
