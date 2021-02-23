const filename = '../staticData/teacherData.json'
let teacher1 = require(filename)
const assignment=require('../staticData/assignment.json')
const teacherHelper='../helpers/teacherHelper'
const studentResults=require('../staticData/studentResult.json')
const students=require('../staticData/studentData.json')
const fs = require('fs')



module.exports.getTeacherDetail=(req,res)=>{
    fs.readFile("staticData/teacherData.json", (err, teacher1) => {
        if (err) throw err;
        let teachers = JSON.parse(teacher1);
        console.log(teachers);
    })
}

module.exports.getTeacher=(req,res)=>{
    
    if(teacher1.length == 0){
        res.status(403).json({message :"No teachers available"});  
    }else{
        console.log(req.params.id);
        teacher1.forEach(teach => {
            if(teach.id==req.params.id)  res.status(200).json({message :teach}); 
        });

        }
}

module.exports.getAssignments=(req,res)=>{
    var assignmentArry = []; 
    if(assignment.length == 0){
        res.status(403).json({message :"No assignment available"});  
        return;
    }else{
        assignment.forEach(ass => {
         if(ass.teachID==req.params.id){
                assignmentArry.push(ass.assID);
                }
    }
    
    );
    res.status(200).json({message :assignmentArry}); 
    }

}

module.exports.getOverallGrade=(req,res)=>{
    let sId;
    var sMarks=[];
    let wrongCount=0;
    let rightCount=0;
    let partialCount=0;
    let marks=0;
    students.forEach(st => {

        if(st.teacherId==req.params.tId)
        {
            sId=st.SId;
            studentResults.forEach(result => {
            if(result.SId==sId && result.assId==req.params.assId){
                if(result.resultStatus=="wrong") wrongCount=wrongCount+1;
                else if(result.resultStatus=="right") rightCount=rightCount+1;
                else if(result.resultStatus=="partial") partialCount=partialCount+1;
            
        }
            });
            marks=((rightCount+(partialCount*0.5))/(wrongCount+rightCount+partialCount))*100
            console.log(marks)
            sMark={
                "sId":sId,
                "marks":marks
            }
            sMarks.push(sMark);
                }

    });console.log(sMarks)
    res.status(200).json({message:sMarks}); 
}






 