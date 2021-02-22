const express = require("express");
const router = express.Router();
const student=require('../controllers/student');


router.get('/:SId', student.getStudent)




module.exports = router;