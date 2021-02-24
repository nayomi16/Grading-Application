const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');

const teacher = require('./routes/teacherApi');
const student = require('./routes/studentApi');
const user = require('./routes/userApi');



//Body parser middleware
app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())
app.use(cors())

//routes
app.use("/teacher",teacher);
app.use("/student",student);
app.use("/user",user);

const port = process.env.PORT ||5000;
app.listen(port, () =>{
	console.log(`server listening on port ${port}`);
});