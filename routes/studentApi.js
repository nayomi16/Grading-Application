const express = require("express");
const router = express.Router();
const student=require('../controllers/student');
const token=require('../config/token')

router.get('/:SId', student.getStudent)
router.get('/assignment/:assId/:sId',student.getDetailResults)
router.get('/assignment/review/:assId/:sId', student.reviewAnswer)


module.exports = router;