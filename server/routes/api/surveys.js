const express = require('express');
const mysql = require('mysql')
const bodyParser = require('body-parser');
const router = express.Router();



router.use(bodyParser.urlencoded({ extended: false }))

// MySQL
const pool = mysql.createPool({
    connectionLimit: 10,
    host           : 'localhost',
    user           : 'root',
    password       : 'secret',
    port           : 3306,
    database       : 'survey_db'
});

// Get Survey Result
router.get('/', (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log(`connected as id ${connection.threadId}`)

        // query(sqlString, callback)
        connection.query('SELECT * from survey_result', (err, rows) => {
            connection.release() // return the connection to pool

            if(!err) {
                res.send(rows)
            } else {
                console.log(err)
            }
        })
    })
})

// Add a Survey Result
router.post('/', (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log(`connected as id ${connection.threadId}`)

        const params = req.body
        connection.query('INSERT INTO survey_result SET ?', params, (err, rows) => {
            connection.release() // return the connection to pool

            if(!err) {
                res.send(`Survey with the record ID: ${[params.id]} has been added.`)
            } else {
                console.log(err)
            }
        })
        console.log(req.body)
    })
})

// Get a Survey Result by ID
router.get('/:id', (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log(`connected as id ${connection.threadId}`)

        // query(sqlString, callback)
        connection.query('SELECT * from survey_result WHERE id = ?', [req.params.id], (err, rows) => {
            connection.release() // return the connection to pool

            if(!err) {
                res.send(rows)
            } else {
                console.log(err)
            }
        })
    })
})

// Delete a Survey Result
router.delete('/:id', (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log(`connected as id ${connection.threadId}`)

        // query(sqlString, callback)
        connection.query('DELETE from survey_result WHERE id = ?', [req.params.id], (err, rows) => {
            connection.release() // return the connection to pool

            if(!err) {
                res.send(`Survey with the record ID: ${[req.params.id]} has been removed.`)
            } else {
                console.log(err)
            }
        })
    })
})

// Update a Survey Result
router.put('/', (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log(`connected as id ${connection.threadId}`)

        const {id, Q1_result, Q2_result, Q3_result} = req.body
        connection.query('UPDATE survey_result SET Q1_result = ?, Q2_result = ?, Q3_result = ? WHERE id = ?', [Q1_result, Q2_result, Q3_result, id], (err, rows) => {
            connection.release() // return the connection to pool

            if(!err) {
                res.send(`Survey with the record ID: ${id} has been updated.`)
            } else {
                console.log(err)
            }
        })
        console.log(req.body)
    })
})

module.exports = router;