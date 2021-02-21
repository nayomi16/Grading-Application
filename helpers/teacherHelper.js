const fs = require('fs')



function writeJSONFile(filename, content) {
    fs.writeFileSync(filename, JSON.stringify(content), 'utf8', (err) => {
        if (err) {
            console.log(err)
        }
    })
}

// fs.readFile('student.json', (err, data) => {
//     if (err) throw err;
//     let student = JSON.parse(data);
//     console.log(student);
// });

function readJSONFile(filename, data) {
    fs.readFile(filename, (err, data) => {
        if (err) throw err;
        let student = JSON.parse(data);
        console.log(student);
    })
}


module.exports = {
    writeJSONFile,
    readJSONFile
}