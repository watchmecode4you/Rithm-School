const Student = require('./Student.js')
const readline = require('readline')
const process = require("process")

// ========================================== Start Program ============================================================
start(Student)
// ============================================ Functions ===========================================================

async function start(Student) {
    let rl1 = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    })
    await askFirstQuestion(rl1)
        .then(async (chosenOperation) => {
            if (chosenOperation === 1){
                await chooseOperation(Student, chosenOperation, 0)
                return 0
            }
            else if (chosenOperation === 2) {
                await chooseOperation(Student, chosenOperation, 0)
                return 0
            } else {
                let rl2 = readline.createInterface({
                    input: process.stdin,
                    output: process.stdout
                })
                await askSecondQuestion(rl2, chosenOperation)
                    .then((inputs) => {
                        chooseOperation(Student, inputs[0], inputs[1])
                    })
                    .catch((e) => console.log(e))
            }
        })
        .catch((e) => console.log(e))
    return 0
}

function askFirstQuestion(rl1) {
    return new Promise((resolve, reject) => {
        try {
            rl1.question(
                "Please choose what operation you would like to do: \n" +
                "1- get the list of all students \n" +
                "2- add a student to the list of students \n" +
                "3- find a student in the list of student \n" +
                "4- update a student in the list of student \n" +
                "5- delete a student in the list of student \n" +
                "6- modify table so that no null names can be inserted \n", (chosenOperation) => {
                    console.log(`You chose operation number ${chosenOperation}`)
                    chosenOperation = parseInt(chosenOperation.trim())
                    resolve(chosenOperation)
                    rl1.close()
                }
            )
        } catch (e) {
            reject(e)
        }
    })
}

function askSecondQuestion(rl2, chosenOperation) {
    return new Promise((resolve, reject) => {
        try {
            rl2.question(
                "Please enter the student id and/or student name \n", (studentId) => {
                    console.log(`Okay, hold on a second`)
                    studentId = parseInt(studentId.trim())
                    resolve([chosenOperation, studentId])
                    rl2.close()
                }
            )
        } catch (e) {
            reject(e)
        }
    })
}

function chooseOperation(Student, chosenOperation, studentId) {
    return new Promise((resolve, reject) => {
        switch (chosenOperation) {
            case 1:
                Student.getStudents().then(() => {
                    process.exit(0)
                }).catch((err) => {
                    console.log(err)
                })
                break
            case 2:
                let rl3 = readline.createInterface({
                    input: process.stdin,
                    output: process.stdout
                })
                rl3.question("Please enter a student name to update", (studentName) => {
                    Student.addStudent(studentName).then(() => {
                        process.exit(0)
                    }).catch((err) => {
                        console.log(err)
                    })
                })
                break
            case 3:
                Student.findStudent(studentId).then(() => {
                    console.log("Student Found")
                    process.exit(0)
                }).catch((err) => {
                    console.log(err)
    
                })
                break
            case 4:
                Student.updateStudent(studentId).then(() => {
                    console.log("Student Updated")
                    process.exit(0)
                }).catch((err) => {
                    console.log(err)
                })
                break
            case 5:
                Student.deleteStudent(studentId).then((data) => {
                    console.log("Student with id ... is deleted.")
                    process.exit(0)
                }).catch((err) => {
                    console.log(err)
                })
                break
            case 6:
                Student.modifyTable().then(() => {
                    console.log("Table was modified successfully.")
                    process.exit(0)
                }).catch((err) => {
                    console.log(err)
                })
                break
            default:
                console.log("Number not within list.")
        }
        resolve()
    })
}