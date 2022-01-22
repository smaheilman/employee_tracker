const express = require('express');
const router = express.Router();
const db = require('../db/connection');
const inputCheck = require('../utils/inputCheck');

router.get('/employee', (req, res) => {
    const sql = `SELECT employee.*, roles.title
    AS roles_title
    FROM employee
    LEFT JOIN roles
    ON employee.roles_id = roles.id`;

    db.query(sql, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({
            message: 'Success',
            data: rows
        });
    });
    console.log(sql)
});


//Get a solo employee

router.get('/employee/:id', (req, res) => {
    const sql = `SELECT employee.*, role.title
    AS roles_title
    FROM employee
    LEFT JOIN roles
    ON employee.roles_id = roles.id
    WHERE employee.id=?`;
    const params = [req.params.id];

    db.query(sql, params, (err, row) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: row
        });
    });
});

// Update a employees role
router.put('/employee/:id', (req, res) => {
    const errors = inputCheck(req.body, 'roles_id');

    if (errors) {
        res.status(400).json({ error: errors });
        return;
    }
    
    const sql = `UPDATE employee SET roles_id = ? WHERE id = ?`;
    const params = [req.body.roles_id, req.params.id];
    db.query(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({ error: err.message });
            // check if a record was found
        } else if (!result.affectedRows) {
            res.json({
                message: 'Employee not found'
            });
        } else {
            res.json({
                message: 'success',
                data: req.body,
                changes: result.affectedRows
            });
        }
    });
});

// Delete a employee
router.delete('/employee/:id', (req, res) => {
    const sql = `DELETE FROM employee WHERE id = ?`;
    const params = [req.params.id];

    db.query(sql, params, (err, result) => {
        if (err) {
            res.statusMessage(400).json({ error: res.message });
        } else if (!result.affectedRows) {
            res.json({
                message: 'Employee not found'
            });
        } else {
            res.json({
                message: 'deleted',
                changes: result.affectedRows,
                id: req.params.id
            });
        }
    });
});

router.post('/employee', ({ body }, res) => {

    const errors = inputCheck(body, 'first_name', 'last_name' );
    if (errors) {
        res.status(400).json({ error: errors });
        return;
    }

    const sql = `INSERT INTO employee (first_name, last_name) VALUES (?,?)`;

    const params = [body.first_name, body.last_name];

    db.query(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: body
        });
    });
});

module.exports = router;