const express = require('express');
const AuthRouter = require('./routers/authRouter')
const TodoRouter = require('./routers/todoRouter')
const cors = require('cors')


const app = express()
app.use(express.json())
const PORT = 4000


app.use(cors())

app.get('/' , (req,res) => {
    res.send("Hello")
})

app.use('/auth',AuthRouter)
app.use('/todo',TodoRouter)

app.listen(PORT , () => console.log('API RUNNING ON PORT ' + PORT))





