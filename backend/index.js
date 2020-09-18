const express = require('express');
const contr = require('./controllers/authController')

const app = express()
app.use(express.json())
const PORT = 4000

app.get('/' , (req,res) => {
    res.send("Hello")
})

app.post('/register',contr.register)
app.post('/login',contr.login)
app.patch('/user-email-verification',contr.verification)


app.listen(PORT , () => console.log('API RUNNING ON PORT ' + PORT))





// password 123
// hash dengan secret key abc
// 123 = xdfthjik


// 123 dengan secret key xyz
// 123 = kljfasfl

// 123 hash dengan secret key abc
// 123 = xdfthjik



// enable less secure
// activate 2 step verification
// create aplication spesific (email)