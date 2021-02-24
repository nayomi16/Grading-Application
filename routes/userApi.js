const express = require("express");
const router = express.Router();
const user=require('../controllers/user');

router.post('/login', user.loginUser)

module.exports = router;