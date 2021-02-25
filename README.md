# gradingapplication 

> This is a REST API backend application that can be used to manage assignments marks of students.

### Requirements

#### Pre requirements

Install Node.js 
* Nodejs environment

## Assumptions
* One Teacher has one class
* One student has one class
* 
### Getting started

* Installs all the dependencies for the project.
```sh
$ npm install 
```
*add static data into staticData files

*Start the API server. Default port is 5000 node index.js

#### Technology stack & other libraries

* Node.js , Expressjs,



#### External Tools & Services

* Postman - API Development Environment (Testing Documentation)
 

Success Response:
```json
Code: 200
message : "true"
data: {Note json objects of all archive notes}
```
Error Response:
```json
Code: 500
message : "false"
data: { error : }

#### Further work
* Implement unit testing ( jest)


