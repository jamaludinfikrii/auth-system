const mysql = require('mysql')

const db = mysql.createConnection({
    user : "root",
    password : '111111111',
    port :3306,
    database : "auth"
})


module.exports = db