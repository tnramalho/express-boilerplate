const express = require('express');
const passport = require('passport');

const UserController = require('../../src/controllers/users.controller');

const router = express.Router();

/* GET users listing. */
router.post('/signup', UserController.signUp);
router.post('/signin', UserController.signIn);
router.get('/:id', UserController.getUser);
router.get('/',passport.authenticate('jwt', { session: false }), UserController.getUsers);

module.exports = router;
