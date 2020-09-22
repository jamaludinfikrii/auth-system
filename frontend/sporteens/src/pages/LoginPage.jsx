import React, { Component } from 'react'
import {Redirect} from 'react-router-dom'

export class LoginPage extends Component {
    state = {
        form : {
            email : '',
            password : ''
        }
        ,
        error : {
            email : '',
            password : ''
        },
        isRedirect : false
    }

    onSubmitClick = () => {
        var data = JSON.stringify(this.state.form)
        var MyHeader = new Headers()
        MyHeader.append("Content-Type", "application/json");

        var requestOptions = {
            method: 'POST',
            headers: MyHeader,
            body: data,
            redirect: 'follow'
        };
        fetch("http://localhost:4000/auth/login",requestOptions)
        .then((response) => response.text())
        .then((data) => {
            var dataParsed = JSON.parse(data)
            if(dataParsed.error === true){
                return alert(dataParsed.message)
            }else{
                localStorage.setItem('tkn-u',dataParsed.data.token)
                this.setState({isRedirect : true})
            }
            console.log(dataParsed.data.token)
        })
        .catch((err) => {
            alert(err.message)
        })
          
    }
    
    onChangeEmail = (e) => {
        const re = /\S+@\S+\.\S+/;
        var email = e.target.value
        var newError;
        if(re.test(email)){
            newError = {...this.state.error , email : ''}
            this.setState({error : newError})
        }else{
            newError = {...this.state.error , email : 'Email Format Wrong'}
            this.setState({error : newError})
        }
        var newData = {...this.state.form , email : e.target.value}
        this.setState({form : newData})
    }

    onChangePassword = (e) => {
        var newData = {...this.state.form , password : e.target.value}
        this.setState({form : newData})
    }

    isDisabled =() => {
        if(this.state.form.email && this.state.form.password && this.state.error.email === ''){
            return false
        }else{
            return true
        }
    }

    render() {
        if(this.state.isRedirect){
            return(
                <Redirect to='/todo' />
            )
        }
        return (
            <div className='container mt-5'>
                <div className="row justify-content-center align-items-center">
                    <div className="col-md-6">
                        <div className="p-4 bg-info rounded">
                            <h4>Login Here</h4>
                            <input type="text" value={this.state.form.email} onChange={this.onChangeEmail} className='form-control mt-4' placeholder='Your Email '/>
                            <p className='text-danger'>{this.state.error.email} </p>
                            <input type="text" value={this.state.form.password} onChange={this.onChangePassword} className='form-control mt-2' placeholder='Your Password '/>
                            <input type="button" onClick={this.onSubmitClick} disabled={this.isDisabled()} className='btn btn-light mt-4' value='submit'/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default LoginPage
