const student = require('../staticData/studentData.json')
const studentResults = require('../staticData/studentResult.json')
const questions = require('../staticData/question.json')
var jwt = require('jsonwebtoken');
var passport = require('passport');

module.exports.getStudent = (req, res) => {
    // console.log("heade=",req.headers.authorization)
    if (student.length == 0) {
        res.status(403).json({ message: "No students available" });
    } else {
        let L = 0;
        const attemptAssignments = new Set()
        let attemptAssignmentsArray = [];
        student.forEach(s => {
            if (s.SId == req.params.SId) {

                studentResults.forEach(stuResult => {
                    if (stuResult.SId == req.params.SId) {
                        attemptAssignments.add(stuResult.assId);
                        L = L + 1;
                    }
                });

                attemptAssignments.forEach(v => attemptAssignmentsArray.push(v));
                var data = {
                    "studentObj": s,
                    "assignments": attemptAssignmentsArray,

                };


                res.status(200).json({
                    "code": 200,
                    "massage": "true",
                    "data": data
                });
            }

        });
        // console.log(attemptAssignmentsArray);
        if (L == 0) {
            res.status(403).json({ message: "Student id is invalid" });
        }
    }
}

module.exports.getDetailResults = (req, res, next) => {

    console.log("heade=", req.headers.authorization)
    const qResults = [];
    let L;
    if (studentResults.length == 0) {
        res.status(403).json({ message: "No questions available" });
    } else {
        studentResults.forEach(result => {
            // console.log(req.params.sId)
            if (result.assId == req.params.assId && result.SId == req.params.sId) {

                var qResult = {
                    "qId": result.qId,
                    "resultStatus": result.resultStatus,
                    "timeSpent": result.timeSpent,
                    "noOfAttempt": result.noOfAttempt
                }
                qResults.push(qResult);

            }
            L = req.params.sId;

        });
        console.log("res=", qResults)
        res.status(200).json({
            "code": 200,
            "massage": "true",
            "data": qResults
        });

    }

}

module.exports.reviewAnswer = (req, res) => {
    const reviewResults = [];
    let que;
    console.log("ok")
    let teacherId;
    let L;
    let correctAnswer;
    student.forEach(st => {
        if (st.SId == req.params.sId) teacherId = st.teacherId;
    });

    if (studentResults.length == 0) {
        res.status(403).json({ message: "No questions available" });
    } else {
        let i = 0;
        studentResults.forEach(result => {

            if (result.assId == req.params.assId && result.SId == req.params.sId) {
                // questions.forEach(question => {
                //     if()

                // });
                // console.log(questions[i].assId,"---",result.assId,"---",teacherId);

                questions.forEach(q => {
                    if (q.qId == result.qId && q.assId == result.assId && q.teachId == teacherId) {
                        que = q.question
                        correctAnswer = q.correctAnswer;
                        console.log(q.question, "--", q.correctAnswer);
                    }
                });

                var reviewResult = {
                    "qId": result.qId,
                    "question": que,
                    "studentAnswer": result.stuAnswer,
                    "correctAnswer": correctAnswer,
                    "resultStatus": result.resultStatus,
                    "timeSpent": result.timeSpent,
                    "noOfAttempts": result.noOfAttempt
                }
                reviewResults.push(reviewResult);
            }

        });
        res.status(200).json({
            "code": 200,
            "massage": true,
            "data": reviewResults
        });



    }
}
