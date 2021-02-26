const express = require("express");
const router = express.Router();
const student=require('../controllers/student');
const jwtHelper=require('../helpers/jwtHelper')



router.get('/:SId',student.getStudent)
router.get('/assignment/:assId/:sId',jwtHelper.verifyJwtToken,student.getDetailResults)
router.get('/assignment/review/:assId/:sId',jwtHelper.verifyJwtToken,student.reviewAnswer)


module.exports = router;