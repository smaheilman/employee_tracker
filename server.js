const db = require('./db/connection');
const express = require('express');
const cTable = require('console.table');
const PORT = process.env.PORT || 3001;
const app = express();
var inquirer = require('inquirer');

const questions = [
    {
        type: 'confirm',
        name: 'addEmployee',
        message: 'Do you want to add an empoyee?',
        default: false
    }
]

inquirer.prompt(questions).then((answers) => {
    console.log(JSON.stringify(answers, null, ''))
})

db.query(`SELECT employee.*, roles.title
AS roles_title,
roles.salary
AS role_salary,
roles.department_id
AS roles_department
FROM employee
JOIN roles
ON employee.role_id = roles.id`, (err, rows) => {
    console.table(rows)
});

db.query(`SELECT * FROM roles`, (err, rows) => {
    console.table(rows)
});


const apiRoutes = require('./apiRoutes');
const Choices = require('inquirer/lib/objects/choices');
const { post } = require('./apiRoutes');

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/api', apiRoutes);

//Default response for any other request (NOT FOOUNDDD)
app.use((req, res) => {
    res.status(404).end();
});

// Start server after DB connection
db.connect(err => {
    if (err) throw err;
    console.log('Database connected.');
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});