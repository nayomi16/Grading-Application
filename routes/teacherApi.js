const express = require("express");
const router = express.Router();
const teacher=require('../controllers/teacher');


// router.get('/teacher', teacher.getTeacherDetail)
// router.get('/one', teacher.getTeacher)
router.get('/:id', teacher.getTeacher)
router.get('/assignments/gradeDetail/:tId/:assId', teacher.getOverallGrade)
router.get('/assignments/statics/:tId/:assId/:qId', teacher.getStatisticsOnQuestion)


module.exports = router;