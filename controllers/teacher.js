const filename = '../staticData/teacherData.json'
let teacher1 = require(filename)
const assignment=require('../staticData/assignment.json')
const teacherHelper='../helpers/teacherHelper'
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






 