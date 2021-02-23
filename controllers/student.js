const student=require('../staticData/studentData.json')
const studentResults=require('../staticData/studentResult.json')
const questions=require('../staticData/question.json')



module.exports.getStudent=(req,res)=>{
    console.log("ok");
    if(student.length == 0){
        res.status(403).json({message :"No students available"});  
    }else{
        let L;
        console.log(req.params.SId);
        const attemptAssignments = new Set()
        let attemptAssignmentsArray = [];
        student.forEach(s => {
            if(s.SId==req.params.SId) {

                studentResults.forEach(stuResult => {
                    if(stuResult.SId==req.params.SId) attemptAssignments.add(stuResult.assId);
                });

                attemptAssignments.forEach(v => attemptAssignmentsArray.push(v));
                var result = { 
                    "studentObj": s, 
                    "assignments": attemptAssignmentsArray, 
                    
                  };

                L=req.params.SId;
                res.status(200).json(result); 
            }
            
        });
        console.log(attemptAssignmentsArray);
        if(L==null){
            res.status(403).json({message :"Student id is invalid"}); 
         }
        }
}

module.exports.getDetailResults=(req,res)=>{
    const qResults=[];
    let L;
    if(studentResults.length == 0){
        res.status(403).json({message :"No questions available"});  
    }else{
        studentResults.forEach(result => {
            console.log(req.params.sId)
            if(result.assId==req.params.assId && result.SId==req.params.sId){
                
               var qResult={
                   "qId":result.qId,
                   "resultStatus":result.resultStatus,
                   "timeSpent":result.timeSpent,
                   "noOfAttempt":result.noOfAttempt
               }
               qResults.push(qResult);

                 }
                 L=req.params.sId;
        
         });
         res.status(200).json({message:qResults}); 
      
    }
}

module.exports.reviewAnswer=(req,res)=>{
    const reviewResults=[];
    let que;
    console.log("ok")
    let teacherId;
    let L;
    student.forEach(st => {
        if(st.SId==req.params.sId) teacherId=st.teacherId;
    });

    if(studentResults.length == 0){
        res.status(403).json({message :"No questions available"});  
    }else{
        let i=0;
        studentResults.forEach(result => {
            
            if(result.assId==req.params.assId && result.SId==req.params.sId){
                // questions.forEach(question => {
                //     if()
                    
                // });
                // console.log(questions[i].assId,"---",result.assId,"---",teacherId);
                
                questions.forEach(q => {
                    if(q.qId==result.qId && q.assId==result.assId && q.teachId==teacherId){
                        que=q.question
                        console.log(q.question);
                    } 
                });
                
                 var reviewResult={
                   "qId":result.qId,
                   "question":que,
                   "studentAnswer":result.stuAnswer,
                   "resultStatus":result.resultStatus,
                   "timeSpent":result.timeSpent,
                   "noOfAttempts":result.noOfAttempt
               }
               reviewResults.push(reviewResult);
                 }
                
         });
         res.status(200).json({message:reviewResults}); 

         
      
    }
}
