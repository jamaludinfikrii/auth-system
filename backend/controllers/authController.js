const hashPassword = require('./../helpers/hash')
const db = require('./../database/mysql')
const validator = require("validator")
const transporter = require('./../helpers/transporter')
const jwt = require('jsonwebtoken')
const handlebars = require('handlebars')
const fs = require('fs')


const RegisterController = (req,res) => {
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
         const passwordHashed = hashPassword(data.password)
         data.password = passwordHashed
 
 
         // store data to db
         db.query('select * from users where email = ?',data.email ,(err,result) => {
             try {
                 if(err) throw err
                 if(result.length === 0){
                     db.query('insert into users set ?' , data , (err,result) => {
                         try {
                             if(err) throw err
                             console.log(result)
                             
                             fs.readFile('/Users/jamaludinfikri/Documents/Purwadhika/authentication-system/backend/template/emailConfirmation.html',{encoding : 'utf-8'},(err,file) => {
                                    if(err) throw err
                                    const template = handlebars.compile(file)
                                    const hasilTemplating = template({email : data.email , link :"http://localhost:3000/verification/" + result.insertId + '/' + passwordHashed , text1 : "ini merupakan deskripsi teks 1",text2 : "ini merupakan deskripsi teks 2"})
                                    transporter.sendMail({
                                        from : "Admin Sporteens",
                                        subject : "Email Verification Sporteens",
                                        to : data.email,
                                        html : hasilTemplating
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
}


const LoginController = (req,res) => {
    // get data from users {email & password}
    const data = req.body

    // password hash
    const passwordHashed = hashPassword(data.password)

    // baru query
    db.query('select * from users where email = ? and password = ?;' ,[data.email,passwordHashed], (err,result) => {
        try {
            if(err) throw err
            if(result.length ===0){
                res.status(200).send({
                    error : true,
                    message : "Password or email invalid"
                })
            }else{

                jwt.sign({email : result[0].email , id : result[0].id , is_email_confirmed : result[0].is_email_confirmed} , '123abc' , (err,token) => {
                    try {
                        if(err) throw err
                        res.status(200).send({
                            error : true,
                            message : "login success",
                            data : {
                                token : token
                            }
                        })

                    } catch (error) {
                        res.json({
                            error : true,
                            message : error
                        })
                    }
                })

            }

        } catch (error) {
            res.status(500).send({
                error : true,
                message : error.message
            })
        }
    })
}

const UserEmailVerificationController = (req,res) => {
    const data = req.body // {id,password}
    db.query('update users set is_email_confirmed = 1 where id = ? and password = ?;',[data.id,data.password],(err,result) => {
        try {
            if(err) throw err
            res.status(201).send({
                error : false,
                message : "user email verified"
            })
        } catch (error) {
            res.status(500).send({
                error : true,
                message : error
            })
        }
    })
}



module.exports = {
    register : RegisterController,
    login : LoginController,
    verification : UserEmailVerificationController
}


// send email flow
    // register user to db
    // read html file with fs
    // replace variable in html {{}} with handlebars
    // send handlebars result to nodemailer

    

