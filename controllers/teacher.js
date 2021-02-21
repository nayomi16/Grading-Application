const filename = '../staticData/teacherData.json'
let teacher1 = require(filename)
const assignment=require('../staticData/assignment.json')
const teacherHelper='../helpers/teacherHelper'
const fs = require('fs')
// const helper = require('../helper.js')



// function getTeacherDetail() {
//     return new Promise((resolve, reject) => {
//         if (teacher.length === 0) {
//             reject({
//                 message: 'no teachers available',
//                 status: 202
//             })
//         }
//         resolve(teacher1)
//         console.log(teacher1);
        
//     })
// }




// module.exports.getTeacherDetail=(req,res)=>{ 
//     const qry = "select note_id, description from note where user_id = ? and archived = true";
//     var user_id = req.params.userid;
//     pool.query(qry, [user_id], (err, result) => {
//       if(err){
//         console.log(err);
//       }
//       else if(result.length == 0){
//         res.status(403).json({message :"No archived notes for this user"});  
//       }else{
//         res.status(200).json({message :result});  
//       }
//     });
//   }

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






 