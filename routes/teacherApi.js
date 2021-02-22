const express = require("express");
const router = express.Router();
const teacher=require('../controllers/teacher');


// router.get('/teacher', teacher.getTeacherDetail)
// router.get('/one', teacher.getTeacher)
router.get('/:id', teacher.getTeacher)
router.get('/assignments/:id', teacher.getAssignments)


module.exports = router;