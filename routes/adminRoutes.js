const express = require('express');
const { createUser,login } = require('../controllers/adminController');
const router =express.Router();

router.post('/login',login)
router.post('/register',createUser)

module.exports =router;