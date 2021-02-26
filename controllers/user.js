const jwt = require('jsonwebtoken');
const users=require('../staticData/user.json')



module.exports.loginUser=(req,res)=>{
    console.log(req)
    const userId=req.body.userId;
    const password=req.body.password;
    let i=0;
    users.forEach(user => {
        if(user.userId==req.body.userId && user.password==req.body.password){
            console.log("ok")
            const token = jwt.sign({_id: user._id}, 'SECRETKEY');
            i=i+1;
            return res.status(200).json({
                "code":200,
                "message":"true",
                "data":{
                    "token":token,
                    "role":user.role
                }
                
        });
        }
    });
    if(i==0){
        res.status(500).json({
            "code":500,
            "message":"'The userId doesnt exists or password is incorect'",
            "data":null
        });
    }
}

