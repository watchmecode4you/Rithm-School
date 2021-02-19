const client = require('./db.js')

exports.getStudents = async function(){
    const results = await client.query("SELECT * FROM students")
    console.log(results.rows)
}

exports.addStudent = async function(name){
    const results = await client.query("INSERT INTO students (name) VALUES ($1) RETURNING *", [name])
    console.log(results.rows[0])
}

exports.findStudent = async function(id){
    const results = await client.query("SELECT * from students WHERE id = ($1)", [id])
    console.log(results.rows[0])
}

exports.updateStudent = async function(id){
    const results = await client.query("UPDATE students SET name = 'Joseph' WHERE id = ($1) RETURNING *", [id])
    console.log(results.rows)
}

exports.deleteStudent = async function(id){
    const results = await client.query("DELETE FROM students WHERE id = ($1)", [id])
    console.log(results)
}

exports.modifyTable = async function(){
    const results = await client.query("ALTER TABLE students ALTER COLUMN name SET NOT NULL")
    console.log(results)
}
