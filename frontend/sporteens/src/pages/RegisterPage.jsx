import React, { Component } from 'react'

export class RegisterPage extends Component {
    state = {
        loading : false
    }
    onSubmitClick = () => {
        this.setState({loading : true})
        // get all value
        var email = this.email.value
        var password = this.password.value
        var confirm = this.confirm.value
        const re = /\S+@\S+\.\S+/;
        try {
            if(!email || !password || !confirm ) throw new Error('Form Harus diisi semuanya')
            if(!re.test(email.toLowerCase())) throw new Error('Email Format Wrong')
            if(password !== confirm) throw new Error('Password dan konfirm tidak sama')
            // send data to api
            var HeaderApi = new Headers()
            HeaderApi.append("Content-Type", "application/json")

            let data = {email,password}
            data = JSON.stringify(data)

            var requestOptions = {
                method: 'POST',
                headers: HeaderApi,
                body: data,
                redirect: 'follow'
            };

            fetch("http://localhost:4000/auth/register",requestOptions)
            .then((response) => {
                console.log(response)
                return response.text()
            })
            .then((result) => {
                console.log(result)
                let dataRes = JSON.parse(result)
                console.log(dataRes)
                alert(dataRes.message)
                this.setState({loading : false})
            })
            .catch((err) => {
                alert(err.message)
                this.setState({loading : false})

            })
              

        } catch (error) {
            alert(error)
            this.setState({loading : false})

        }
        
       
    }
    render() {
        return (
            <div>
                <div className='container mt-5'>
                <div className="row justify-content-center align-items-center">
                    <div className="col-md-6">
                        <div className="p-4 bg-warning rounded">
                            <h4>Register Here</h4>
                            <input type="text" ref={(el) =>{this.email = el}} className='form-control mt-4' placeholder='Your Email '/>
                            <input type="text" ref={(el) =>{this.password = el}} className='form-control mt-2' placeholder='Your Password '/>
                            <input type="text" ref={(el) =>{this.confirm = el}} className='form-control mt-2' placeholder='Confirm Your Password '/>
                            <input type="button" onClick={this.onSubmitClick} className='btn btn-light mt-4' value='submit' disabled={this.state.loading}/>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        )
    }
}

export default RegisterPage
