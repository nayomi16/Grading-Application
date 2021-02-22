const express = require('express');
const bodyParser = require('body-parser');
const app = express();


const teacher = require('./routes/teacherApi');
const student = require('./routes/studentApi');




//Body parser middleware
app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())

//routes
app.use("/teacher",teacher);
app.use("/student",student);

const port = process.env.PORT ||5000;
app.listen(port, () =>{
	console.log(`server listening on port ${port}`);
});