import React, { Component } from 'react'

export class LoginPage extends Component {
    render() {
        return (
            <div className='container mt-5'>
                <div className="row justify-content-center align-items-center">
                    <div className="col-md-6">
                        <div className="p-4 bg-info rounded">
                            <h4>Login Here</h4>
                            <input type="text" className='form-control mt-4' placeholder='Your Email '/>
                            <input type="text" className='form-control mt-2' placeholder='Your Password '/>
                            <input type="button" className='btn btn-light mt-4' value='submit'/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default LoginPage
