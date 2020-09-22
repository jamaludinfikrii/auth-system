const db = require('./../database/mysql')


const getAllTodo = (req,res) => {
    db.query('select * from todos;', (err,result) => {
        try {
            if(err) throw err
            if(result.length === 0) throw {message : 'Data Null'}
            res.json({
                error : false,
                data : result
            })
        } catch (error) {
            res.json({
                error : true,
                message : error.message
            })
        }
    })
}


module.exports = {
    getAllTodo
}