const filename = '../staticData/teacherData.json'
let teacher1 = require(filename)
const assignment = require('../staticData/assignment.json')
const teacherHelper = '../helpers/teacherHelper'
const studentResults = require('../staticData/studentResult.json')
const students = require('../staticData/studentData.json')
const questions = require('../staticData/question.json')
const fs = require('fs')



module.exports.getTeacherDetail = (req, res) => {
    fs.readFile("staticData/teacherData.json", (err, teacher1) => {
        if (err) throw err;
        let teachers = JSON.parse(teacher1);
        console.log(teachers);
    })
}

module.exports.getTeacher = (req, res) => {
    var assignmentArry = [];
    var question = [];
    if (teacher1.length == 0) {
        res.status(403).json({ message: "No teachers available" });
    } else {
        console.log(req.params.id);
        teacher1.forEach(teach => {
            if (teach.id == req.params.id) {
                assignment.forEach(ass => {
                    if (ass.teachID == req.params.id) {
                        questions.forEach(ques => {
                            if (ques.teachId == req.params.id && ques.assId == ass.assID) {
                                var obj = {
                                    "qId": ques.qId,
                                    "ques": ques.question
                                }

                                question.push(obj)

                            }

                        });
                        var teacherAss = {
                            "assId": ass.assID,
                            "quesIds": question
                        }

                        assignmentArry.push(teacherAss)
                        question = [];
                        //    assignmentArry.push(ass.assID);
                    }
                });

                var data = {
                    "teacherObj": teach,
                    "teacherAssgnDetails": assignmentArry

                }
                res.status(200).json({
                    "code": 200,
                    "massage": "true",
                    "data": data
                });

            }


        });


    }
}



module.exports.getOverallGrade = (req, res) => {
    let sId;
    let noOfAttempts;
    var sMarks = [];
    let wrongCount = 0;
    let rightCount = 0;
    let partialCount = 0;
    let marks = 0;
    students.forEach(st => {

        if (st.teacherId == req.params.tId) {
            sId = st.SId;
            studentResults.forEach(result => {
                if (result.SId == sId && result.assId == req.params.assId) {
                    if (result.resultStatus == "wrong") wrongCount = wrongCount + 1;
                    else if (result.resultStatus == "right") rightCount = rightCount + 1;
                    else if (result.resultStatus == "partial") partialCount = partialCount + 1;
                    noOfAttempts = result.noOfAttempt;
                }
            });
            marks = ((rightCount + (partialCount * 0.5)) / (wrongCount + rightCount + partialCount)) * 100
            console.log(marks)
            sMark = {
                "sId": sId,
                "marks": marks.toFixed(2),
                "noOfAttempts": noOfAttempts
            }
            sMarks.push(sMark);
        }

    }); console.log(sMarks)
    res.status(200).json({
        "code": 200,
        "massage": "true",
        "data": sMarks
    });
}

module.exports.getStatisticsOnQuestion = (req, res) => {
    let totaltimeSpent = 0;
    let noOfStudents = 0;
    let averageTimeSpent = 0;
    let corectCount = 0;
    let corectPercentage = 0;
    students.forEach(st => {
        if (st.teacherId == req.params.tId) {
            studentResults.forEach(result => {
                if (result.SId == st.SId && result.assId == req.params.assId && result.qId == req.params.qId) {
                    if (result.resultStatus == "right") corectCount = corectCount + 1;
                    totaltimeSpent = totaltimeSpent + result.timeSpent;
                }
            });
            noOfStudents = noOfStudents + 1;
        }
    });
    averageTimeSpent = totaltimeSpent / noOfStudents;
    corectPercentage = (corectCount / noOfStudents) * 100
    console.log(corectPercentage, " ", averageTimeSpent);
    var statics = {
        "qId": req.params.qId,
        "averageTimeSpent": averageTimeSpent,
        "corectPercentage": corectPercentage
    }
    res.status(200).json({
        "code": 200,
        "massage": "true",
        "data": statics
    });
}





