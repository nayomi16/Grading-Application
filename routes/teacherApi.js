const express = require("express");
const router = express.Router();
const teacher=require('../controllers/teacher');
 const jwtHelper=require('../helpers/jwtHelper')

// router.get('/teacher', teacher.getTeacherDetail)
// router.get('/one', teacher.getTeacher)
router.get('/:id', teacher.getTeacher)
router.get('/assignments/gradeDetail/:tId/:assId',jwtHelper.verifyJwtToken, teacher.getOverallGrade)
router.get('/assignments/statics/:tId/:assId/:qId',jwtHelper.verifyJwtToken, teacher.getStatisticsOnQuestion)


module.exports = router;