const express = require("express");
const router = express.Router();
const student=require('../controllers/student');


router.get('/:SId', student.getStudent)
router.get('/assignment/:assId/:sId', student.getDetailResults)



module.exports = router;