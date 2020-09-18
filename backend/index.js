const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const nodemailer = require('nodemailer');
const validator = require("validator")
const crypto =require('crypto')

// create db connection
const db = mysql.createConnection({
    user : "root",
    password : '111111111',
    port :3306,
    database : "auth"
})

const app = express()
app.use(express.json())
const PORT = 4000

// create transporter email
const transporter = nodemailer.createTransport(
    {
        service : "gmail",
        auth : {
            user : "jamesfikrii@gmail.com",
            pass : "tnfiivhehgbwodsu"
        },
        tls : {
            rejectUnauthorized : false
        }
    }
)

app.get('/' , (req,res) => {
    res.send("Hello")
})

app.post('/register' , (req,res) => {
    // Get all data value
    const data = req.body // {email,password}
    // validasi data

    // if(data.email && data.password){
    //     if(!(validator.isEmail(data.email))){
    //         res.status(406).send({
    //             error : true,
    //             message : "Email Format Wrong"
    //         })
    //     }

    //     if(data.password.length < 8){
    //         res.status(406).send({
    //             error : true,
    //             message : "Password too short"
    //         })
    //     }

    //     res.send('success')

    // }else{
    //     res.status(406).send({
    //         error : true,
    //         message : "data not complete (username or password)"
    //     })
    // }

    try {
        // validasi data
        if( !data.email || !data.password) throw "Data not complete"
        if(!(validator.isEmail(data.email))) throw "Email format wrong"
        if(data.password.length < 8) throw "password too short (min 8 char)"

        // hash password
        try {
            const hmac = crypto.createHmac('sha256', 'abc123');
            hmac.update(data.password);
            const passwordHashed = hmac.digest('hex');
            data.password = passwordHashed
        } catch (error) {
            res.status(500).send({
                error : true,
                message : 'failed to hash password'
            })
        }


        // store data to db
        db.query('select * from users where email = ?',data.email ,(err,result) => {
            try {
                if(err) throw err
                if(result.length === 0){
                    db.query('insert into users set ?' , data , (err,result) => {
                        try {
                            if(err) throw err
                            console.log(result)
                            transporter.sendMail({
                                from : "Admin Sporteens",
                                subject : "Email Verification Sporteens",
                                to : data.email,
                                html : `
                                <h1> Hello , ${data.email} </h1>
                                <span>
                                Klik link 
                                <a href="https://www.google.com" target="_blank"> ini </a>
                                Untuk Memverifikasi Email Mu
                                </span>
                                `
                            })
                            .then((respons) => {
                                res.status(200).send({
                                    error : false,
                                    message : "Register Success, email already sent !!"
                                })
                            })
                            .catch((err) => {
                                res.status(500).send({
                                    error: true,
                                    message : err.message
                                })
                            })



                            // send email

            
                        } catch (error) {
                            res.status(500).send({
                                error : true,
                                message : error.message
                            })
                        }
                    })
                }else{
                    res.status(500).send({
                        error : true,
                        message : "Email already been registered"
                    })
                }
            } catch (error) {
                res.status(500).send({
                    error : true,
                    message : error.message
                })
            }
        })

        



    } catch (error) {
        res.status(406).send({
            error : true,
            message : error
        })
    }


    // hash password data
    // store data ke db
    // kirim email
})


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